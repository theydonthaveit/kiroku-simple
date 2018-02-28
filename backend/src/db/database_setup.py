import sys
import datetime
import jwt

from sqlalchemy import create_engine

from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, ARRAY
from sqlalchemy_utils import EmailType, PasswordType
from passlib.hash import pbkdf2_sha512

from sqlalchemy.ext.declarative import declarative_base, declared_attr

Base = declarative_base()

# would never strucutre models and tables like this

class BaseMixin(object):

    @declared_attr
    def id(self):

        return Column(Integer, primary_key=True, unique=True)

    @declared_attr
    def created_at(self):

        return Column(DateTime, default=datetime.datetime.utcnow)

    @declared_attr
    def updated_at(self):

        return Column(DateTime, default=datetime.datetime.utcnow)


class KirokuUser(Base, BaseMixin):

    __tablename__ = 'kiroku_user'

    name = Column(String(120), nullable=False)
    email = Column(EmailType, nullable=False)
    password = Column(String(1000), nullable=False)

    @property
    def serialize(self):
	    return {
			'id': self.id,
			'name': self.name,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
			'_links': {
				'self': {
					'rel': 'Provide user name and corresponding content',
					'href': '/user/{id}/'
				}
			}
        }

    def decode_password(self, password):
        return pbkdf2_sha512.verify(password, self.password)

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            """we will never store a secret key like below"""
            return jwt.encode(
                payload,
                'xxx-xxx-xxx',
                algorithm='HS256'
            )
        except Exception as e:
            return e


def encode_password(password):
    return pbkdf2_sha512.hash(password)

# would never group so many things in one table
# would split it out across numerous tables and reference by index on relationships
# hence the bad use of Strings in db

class KirokuBusiness(Base, BaseMixin):

    __tablename__ = 'kiroku_business'

    business = Column(String(120), nullable=False)
    client = Column(String(50), nullable=False)
    note = Column(String(10000), nullable=False)
    workspace = Column(String(20), nullable=True)

    @property
    def serialize(self):
	    return {
			'id': self.id,
			'business': self.business,
            'client': self.client,
            'note': self.note,
            'workspace': self.workspace,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
			'_links': {
				'self': {
					'rel': 'Display business name and corresponding content',
					'href': '/business/{id}/'
				}
			}
        }


engine = create_engine('postgres://postgres@localhost:5432/kiroku-simple')
Base.metadata.create_all(engine)