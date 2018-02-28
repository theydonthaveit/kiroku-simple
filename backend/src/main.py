from flask import g, Flask, request, jsonify
from functools import wraps
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from db.database_setup import Base, engine, KirokuUser, encode_password, KirokuBusiness

Base.metadata.create_all(engine)

DBsession = sessionmaker(bind=engine)
session = DBsession()

app = Flask(__name__, static_folder='static')
# would never store secret keys like this
app.secret_key = 'xxx-xxx-xxx'

def jwt_required(f):
    def wrap(*args, **kwargs):
        # if user is not logged in - send them to register
        if not request.headers["authorization"]:
            return 'You are in trouble'
        # finally call f. f() now haves access to g.user
        return f(*args, **kwargs)

    return wrap


# home of API for documentation
@app.route('/')
def root():
    return jsonify({
        'v1': 'This would detail the API'
    })


# register account and receive a JWT token
@app.route('/register/tokenize', methods=['POST'])
def regTokenize():
    # restrict entries of same name etc.
    # would never be here
    password = encode_password(request.json['password'])
    User = KirokuUser(
        name=request.json['name'],
        email=request.json['email'],
        password=password
    )
    session.add(User)
    session.commit()
    token = User.encode_auth_token(User.id)
    # add token to an in-memory / session system
    return token


# login account and receive a JWT token
@app.route('/login/tokenize', methods=['POST'])
def logTokenize():
    User = session.query(KirokuUser).filter_by(
        name=request.json['name']
    ).first()
    if User.decode_password(request.json['password']):
        token = User.encode_auth_token(User.id)
        # add token to an in-memory / session system
        return token


@app.route('/business/<int:user_id>', methods=['GET', 'POST'])
@jwt_required
def fun(user_id):
    if request.method == 'POST':
        Business = KirokuBusiness(
            business=request.json['business'],
            client=request.json['client'],
            note=request.json['note'],
            workspace=request.json['workspace']
        )
        session.add(Business)
        session.commit()
        return jsonify(Business.id)
    elif request.method == 'GET':
        Business = session.query(KirokuBusiness).filter_by(
            id=user_id
        ).first()
        # serialize will be it's own function
        return jsonify(KirokuBusiness=[Business.serialize])
    else:
        return jsonify('bad request method')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
