from flask import Blueprint, jsonify
from app.utils.decorators import login_required

api_bp = Blueprint('api', __name__)

@api_bp.route('/protected/data', methods=['GET'])
@login_required
def get_protected_data():
    dummy_payload = {
        "message": "This is a protected route",
        "data": {
            "key1": "value1",
            "key2": "value2"
        }
    }
    return jsonify(dummy_payload)

@api_bp.route('/info', methods=['GET'])
def get_info():
    return jsonify({
        "name": "Minimal Web Flask",
        "description": "Simple flask and react boilerplate app that can be extended to showcase different features.",
        "repositoryOptional": "https://github.com/rohit-lakhanpal/minimal-web-flask",
        "faviconOptional": None,            
    })