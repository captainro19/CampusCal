from flask import Flask, request, jsonify
import os
import pdfplumber
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'syllabus' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['syllabus']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    file.save(file_path)

    try:
        with pdfplumber.open(file_path) as pdf:
            text = ''
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                text += page_text + "\n"

        events = parse_events_from_text(text)

        os.remove(file_path)

        return jsonify({'events': events}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def parse_events_from_text(text):
    lines = text.split('\n')
    events = []

    date_pattern = re.compile(r'(\d{1,2}/\d{1,2}/\d{4})')

    for line in lines:
        if ("Assignment" in line or "Event" in line) and date_pattern.search(line):
            match = date_pattern.search(line)
            if match:
                date = match.group(1)
                event_name = re.split(r'–|-', line)[0].replace("Assignment:", "").replace("Event:", "").strip()

                events.append({
                    'name': event_name,
                    'date': date,
                    'description': 'Fintech assignment due date'
                })

    return events

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(port=5000, debug=True)
