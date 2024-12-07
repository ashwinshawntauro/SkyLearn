from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import pdfplumber
import string
import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import os

def generate_certificate(output_path, uid, candidate_name, course_name, org_name, institute_logo_path,cert_id):
    width, height = A4
    c = canvas.Canvas(output_path, pagesize=A4)

    # Set up border
    border_margin = 30
    c.setStrokeColor(colors.HexColor("#003366"))  # Elegant blue color
    c.setLineWidth(3)
    c.rect(
        border_margin,
        border_margin,
        width - 2 * border_margin,
        height - 2 * border_margin
    )

    # Add logo
    if institute_logo_path:
        try:
            logo_width, logo_height = 1.5 * inch, 1.5 * inch
            logo_x = (width - logo_width) / 2
            logo_y = height - 2 * inch
            c.drawImage(institute_logo_path, logo_x, logo_y, logo_width, logo_height, preserveAspectRatio=True, mask='auto')
        except Exception as e:
            print(f"Error loading logo: {e}")

    # Organization Name
    c.setFont("Times-Bold", 24)
    c.setFillColor(colors.HexColor("#003366"))
    org_y = height - 3 * inch
    c.drawCentredString(width / 2, org_y, org_name)

    # Certificate Title
    c.setFont("Times-Bold", 30)
    c.setFillColor(colors.black)
    title_y = org_y - 0.75 * inch
    c.drawCentredString(width / 2, title_y, "Certificate of Completion")

    # Recipient's Name
    c.setFont("Helvetica-Bold", 22)
    name_y = title_y - inch
    c.drawCentredString(width / 2, name_y, candidate_name)

    # Course Details
    c.setFont("Helvetica", 16)
    course_y = name_y - 0.5 * inch
    c.drawCentredString(width / 2, course_y, f"has successfully completed the course:")

    c.setFont("Times-BoldItalic", 18)
    course_name_y = course_y - 0.4 * inch
    c.drawCentredString(width / 2, course_name_y, course_name)

    # UID Section
    c.setFont("Helvetica", 12)
    uid_y = course_name_y - 0.75 * inch
    c.drawCentredString(width / 2, uid_y, f"UID: {uid}")

    # Blockchain Signature Section
    signature_y = uid_y - 1.5 * inch
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(colors.HexColor("#003366"))
    c.drawCentredString(width / 2, signature_y, "Blockchain Authenticated")
    c.line(width / 2 - 150, signature_y - 10, width / 2 + 150, signature_y - 10)

    # Certificate ID
    cert_id_y = signature_y - 1 * inch
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.black)
    c.drawCentredString(width / 2, cert_id_y, f"Certificate ID: {cert_id}")

    # Generate QR Code for IPFS URL
    ipfs_url = f"http://localhost:3000/api/storeCertificate?certificate_id={cert_id}"
    qr = qrcode.make(ipfs_url)
    qr_path = "qr_code.png"
    qr.save(qr_path)
    
    print(ipfs_url)

    # Embed QR Code in the bottom-right corner
    qr_size = 1.3 * inch  # Adjust size as needed
    qr_x = width - border_margin - qr_size -3 # Positioned to the right
    qr_y = border_margin+3  # Positioned at the bottom
    c.drawImage(qr_path, qr_x, qr_y, qr_size, qr_size, preserveAspectRatio=True, mask='auto')

    # Add instruction text above the QR code
    qr_text_y = qr_y + qr_size -5
    c.setFont("Helvetica", 10)
    c.drawRightString(qr_x + qr_size - 10, qr_text_y, "Scan to verify ")

    # Save PDF
    c.save()
    os.remove(qr_path)


    print(f"Certificate generated and saved at: {output_path}")


def extract_certificate(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        # Extract text from each page
        text = ""
        for page in pdf.pages:
            text += page.extract_text()

        # Split text into lines
        lines = text.splitlines()

        # Extract values based on the layout in the certificate
        try:
            org_name = lines[0]  # The organization name is on line 3
            candidate_name = lines[2]  # The recipient's name is on line 5
            course_name = lines[4]  # The course name is on line 7
            uid = lines[5]  # UID is on line 8
        except IndexError:
            return None  # If the certificate format is incorrect or lines are missing
        return (uid[5:], candidate_name, course_name, org_name)
