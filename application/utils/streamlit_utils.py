import base64
import requests
import os
from connection import contract


def displayPDF(file):
    # Opening file from file path
    with open(file, "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')

    # Embedding PDF in HTML
    pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="700" height="1000" type="application/pdf"></iframe>'
    return pdf_display
    # Displaying File


def view_certificate(certificate_id):
    try:
        # Call the getCertificate function from the contract
        certificate = contract.functions.getCertificate(certificate_id).call()

        # Extract the IPFS hash
        ipfs_hash = certificate[4]  # Assuming the IPFS hash is the 5th return value
        return ipfs_hash
    except Exception as e:
        print(f"Error: {e}")
        raise ValueError("Certificate not found!")
    # st.markdown(f'<a href="https://peach-passive-porpoise-942.mypinata.cloud/ipfs/{ipfs_hash}" target="_blank">Visit IPFS Link</a>', unsafe_allow_html=True)


    # pinata_gateway_base_url = 'https://gateway.pinata.cloud/ipfs'
    # content_url = f"{pinata_gateway_base_url}/{ipfs_hash}"
    # response = requests.get(content_url)
    # with open("temp.pdf", 'wb') as pdf_file:
    #     pdf_file.write(response.content)
    # displayPDF("temp.pdf")
    # os.remove("temp.pdf")
