from flask import Blueprint, redirect, request, session, url_for
from msal import ConfidentialClientApplication
from app.config import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    session['state'] = 'random_state_string'
    auth_url = _build_auth_url(scopes=Config.SCOPE, state=session['state'])
    return redirect(auth_url)

@auth_bp.route('/callback')
def authorized():
    if request.args.get('state') != session.get('state'):
        return redirect(url_for('index'))

    if 'error' in request.args:
        return 'Error: ' + request.args['error'] + ' - ' + request.args['error_description']

    result = _build_msal_app().acquire_token_by_authorization_code(
        request.args['code'],
        scopes=Config.SCOPE,
        redirect_uri=Config.REDIRECT_URI)

    if 'access_token' in result:
        session['user'] = result.get('id_token_claims')
        return redirect(url_for('index'))
    return 'Could not acquire token.'

def _build_msal_app(cache=None, authority=None):
    return ConfidentialClientApplication(
        Config.CLIENT_ID, authority=authority or Config.AUTHORITY,
        client_credential=Config.CLIENT_SECRET, token_cache=cache)

def _build_auth_url(authority=None, scopes=None, state=None):
    return _build_msal_app(authority=authority).get_authorization_request_url(
        scopes or [], state=state, redirect_uri=Config.REDIRECT_URI)