from flask import Flask, request, jsonify
from PIL import Image
import torch
from torchvision import transforms
import io
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load your YOLO model here
try:
    logging.debug("Loading the YOLO model...")
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='../../../../Model/best.pt')
    model.eval()  # Set the model to evaluation mode
    logging.debug("YOLO model loaded successfully.")
except Exception as e:
    logging.error(f"Failed to load model: {e}")
    raise

@app.route('/proimg', methods=['POST'])
def detect():
    logging.debug("Received request at /proimg")
    
    if 'image_path' not in request.files:
        logging.error("No image file provided in request.")
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image_path']
    logging.debug("Received image file.")

    try:
        image_bytes = image_file.read()
        img = Image.open(io.BytesIO(image_bytes))
        logging.debug("Image successfully opened.")
    except Exception as e:
        logging.error(f"Failed to process image: {e}")
        return jsonify({'error': 'Failed to process image'}), 400

    try:
        # Perform inference
        logging.debug("Performing inference...")
        results = model(img, size=640)
        logging.debug("Inference complete.")
        
        # Process results
        detections = results.pandas().xyxy[0].to_json(orient='records')
        logging.debug("Results processed.")
    except Exception as e:
        logging.error(f"Failed during inference: {e}")
        return jsonify({'error': 'Failed during inference'}), 500

    return jsonify({'detections': detections})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
