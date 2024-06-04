import os
from flask import Flask, send_from_directory
from app.routes.auth import auth_bp
from app.routes.api import api_bp

def create_app():
    app = Flask(__name__, static_folder='build', static_url_path='/')
    app.config.from_object('app.config.Config')

    # Register the blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(api_bp, url_prefix='/api')

    # Add a catch-all route for the frontend that returns a string OK.
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
      # If the app.static_folder does not exist, just return OK.
      if not os.path.exists(app.static_folder):
        return 'OK'
      
      # Catchall via the react app
      full_path = os.path.join(app.static_folder, path)
      if os.path.exists(app.static_folder) and os.path.isdir(app.static_folder):
        return send_from_directory(full_path, 'index.html')
    return app