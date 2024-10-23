from flask import Flask, render_template, request
from utils.cert_utils import generate_certificate
import os
import requests
import hashlib
from connection import contract, w3
from utils.streamlit_utils import view_certificate
from utils.streamlit_utils import displayPDF
from utils.cert_utils import extract_certificate
import json


api_key = os.getenv("PINATA_API_KEY")
api_secret = os.getenv("PINATA_API_SECRET")


def upload_to_pinata(file_path, api_key, api_secret):
    # Set up the Pinata API endpoint and headers
    pinata_api_url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    headers = {
        "pinata_api_key": api_key,
        "pinata_secret_api_key": api_secret,
    }

    # Prepare the file for upload
    with open(file_path, "rb") as file:
        files = {"file": (file.name, file)}

        # Make the request to Pinata
        response = requests.post(pinata_api_url, headers=headers, files=files)

        # Parse the response
        result = json.loads(response.text)

        if "IpfsHash" in result:
            ipfs_hash = result["IpfsHash"]
            print(f"File uploaded to Pinata. IPFS Hash: {ipfs_hash}")
            return ipfs_hash
        else:
            print(f"Error uploading to Pinata: {result.get('error', 'Unknown error')}")
            return None


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/institute")
def institute():
    return render_template("institute.html")


@app.route("/verifier")
def verifier():
    return render_template("verifier.html")


@app.route("/generate-certificate", methods=["GET", "POST"])
def generate_certificate_route():
    if request.method == "POST":
        # Get form data from the POST request
        uid = request.form.get("uid")
        candidate_name = request.form.get("candidate_name")
        course_name = request.form.get("course_name")
        org_name = request.form.get("org_name")

    elif request.method == "GET":
        # Get data from query parameters for GET request
        uid = request.args.get("uid")
        candidate_name = request.args.get("candidate_name")
        course_name = request.args.get("course_name")
        org_name = request.args.get("org_name")

    # Ensure that all required parameters are provided
    if not all([uid, candidate_name, course_name, org_name]):
        return "Missing parameters! Please provide uid, candidate_name, course_name, and org_name.", 400

    # Define file paths for certificate generation
    pdf_file_path = "certificate.pdf"
    institute_logo_path = "../assets/logo.jpg"

    # Call the certificate generation function
    generate_certificate(
        pdf_file_path,
        uid,
        candidate_name,
        course_name,
        org_name,
        institute_logo_path,
    )
    
    ipfs_hash = upload_to_pinata(pdf_file_path, api_key, api_secret)

    # Remove the generated PDF file after uploading to IPFS
    os.remove(pdf_file_path)
    
    # Calculate the certificate ID
    data_to_hash = f"{uid}{candidate_name}{course_name}{org_name}".encode("utf-8")
    certificate_id = hashlib.sha256(data_to_hash).hexdigest()

    # Smart Contract Call
    contract.functions.generateCertificate(
        certificate_id, uid, candidate_name, course_name, org_name, ipfs_hash
    ).transact({"from": w3.eth.accounts[0]})

    return f"Certificate successfully generated with Certificate ID: {certificate_id}"



@app.route("/view-certificate", methods=["GET", "POST"])
def view_certificate_route():
    if request.method == "POST":
        # Get the certificate ID from the form submission
        certificate_id = request.form["certificate_id"]

        try:
            # Assume view_certificate returns the IPFS hash for the certificate
            ipfs_hash = view_certificate(certificate_id)

            # Generate the IPFS link
            ipfs_link = (
                f"https://peach-passive-porpoise-942.mypinata.cloud/ipfs/{ipfs_hash}"
            )

            # Return the HTML with the embedded IPFS link in an iframe
            return f'<iframe src="{ipfs_link}" width="600" height="400" frameborder="0"></iframe>'
        except Exception as e:
            # Handle the case where the certificate ID is invalid
            return "Invalid Certificate ID!"

    # For GET requests, render the HTML form
    return render_template("view_certificate_form.html")


@app.route("/upload-certificate", methods=["GET", "POST"])
def upload_certificate_route():
    if request.method == "POST":
        # Ensure that the file is in the request
        if "certificate_file" not in request.files:
            return "No file part in the request"

        certificate_file = request.files["certificate_file"]

        if certificate_file.filename == "":
            return "No selected file"

        if certificate_file and certificate_file.filename.endswith(".pdf"):
            # Save the uploaded file
            certificate_file.save("certificate.pdf")

            try:
                # Assuming extract_certificate is a function that extracts details from the certificate
                (uid, candidate_name, course_name, org_name) = extract_certificate(
                    "certificate.pdf"
                )
                pdf_display = displayPDF("certificate.pdf")

                os.remove("certificate.pdf")

                # Calculating the certificate hash
                data_to_hash = f"{uid}{candidate_name}{course_name}{org_name}".encode(
                    "utf-8"
                )
                certificate_id = hashlib.sha256(data_to_hash).hexdigest()

                # Smart Contract Verification
                result = contract.functions.isVerified(certificate_id).call()

                if result:
                    return f"Certificate validated successfully!<br>{pdf_display}"
                else:
                    return "Invalid Certificate! It might be tampered."

            except Exception as e:
                return "Invalid Certificate! Error during processing."

        else:
            return "Please upload a valid PDF file."


if __name__ == "__main__":
    app.run(debug=True)  # Ensure debug=True is set
