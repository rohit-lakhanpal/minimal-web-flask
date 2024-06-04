from flask import Flask
from app.routes.auth import auth_bp
from app.routes.api import api_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(api_bp, url_prefix='/api')

    # Add a catch-all route for the frontend that returns a string OK.
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return 'OK'

    return app