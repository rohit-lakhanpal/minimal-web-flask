import os

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'your_secret_key')
    CLIENT_ID = os.getenv('AZURE_CLIENT_ID', 'your_client_id')
    CLIENT_SECRET = os.getenv('AZURE_CLIENT_SECRET', 'your_client_secret')
    AUTHORITY = os.getenv('AZURE_AUTHORITY', 'https://login.microsoftonline.com/your_tenant_id')
    REDIRECT_URI = os.getenv('REDIRECT_URI', 'http://localhost:5000/auth/callback')
    SCOPE = ['User.Read']
    APPINSIGHTS_INSTRUMENTATIONKEY = os.getenv('APPINSIGHTS_INSTRUMENTATIONKEY')
