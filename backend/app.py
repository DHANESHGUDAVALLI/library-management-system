from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

from extensions import db, bcrypt, jwt
from google import genai

from dotenv import load_dotenv
import os

# Load Environment Variables
load_dotenv()

# Gemini Client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Flask App
app = Flask(__name__)

# =========================
# CONFIGURATIONS
# =========================

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# =========================
# INITIALIZE EXTENSIONS
# =========================

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

# =========================
# ENABLE CORS
# =========================

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)

# =========================
# IMPORT MODELS
# =========================

from models import User, Favorite, BorrowedBook

# =========================
# CREATE DATABASE TABLES
# =========================

with app.app_context():
    db.create_all()

# Home Route
@app.route("/")
def home():

    return {
        "message": "Library Backend Running 🚀"
    }

# Register Route
@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Check Existing User
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:

        return jsonify({
            "message": "User already exists"
        }), 400

    # Hash Password
    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    # Create User
    new_user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    }), 201

# Login Route
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # Find User
    user = User.query.filter_by(email=email).first()

    # Check User Exists
    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    # Check Password
    is_correct_password = bcrypt.check_password_hash(
        user.password,
        password
    )

    if not is_correct_password:

        return jsonify({
            "message": "Invalid password"
        }), 401

    # Create JWT Token
    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "username": user.username,
        "email": user.email
    }), 200

    # Profile Route
@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    # Get User ID From Token
    user_id = get_jwt_identity()

    # Find User
    user = User.query.get(user_id)

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "username": user.username,
        "email": user.email
    }), 200

    # Add Favorite
@app.route("/favorites", methods=["POST"])
@jwt_required()
def add_favorite():

    user_id = get_jwt_identity()

    data = request.get_json()

    title = data.get("title")
    author = data.get("author")
    image = data.get("image")

    # Create Favorite
    favorite = Favorite(
        title=title,
        author=author,
        image=image,
        user_id=int(user_id)
    )

    db.session.add(favorite)
    db.session.commit()

    return jsonify({
        "message": "Book added to favorites"
    }), 201

    # Get Favorites
@app.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():

    user_id = get_jwt_identity()

    favorites = Favorite.query.filter_by(
        user_id=int(user_id)
    ).all()

    favorite_list = []

    for favorite in favorites:

        favorite_list.append({
            "id": favorite.id,
            "title": favorite.title,
            "author": favorite.author,
            "image": favorite.image
        })

    return jsonify(favorite_list), 200

    # Delete Favorite
@app.route("/favorites/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_favorite(id):

    user_id = get_jwt_identity()

    favorite = Favorite.query.filter_by(
        id=id,
        user_id=int(user_id)
    ).first()

    if not favorite:

        return jsonify({
            "message": "Favorite not found"
        }), 404

    db.session.delete(favorite)

    db.session.commit()

    return jsonify({
        "message": "Favorite removed"
    }), 200

    # Borrow Book
@app.route("/borrow", methods=["POST"])
@jwt_required()
def borrow_book():

    user_id = get_jwt_identity()

    data = request.get_json()

    title = data.get("title")
    author = data.get("author")
    image = data.get("image")

    borrowed_book = BorrowedBook(
        title=title,
        author=author,
        image=image,
        user_id=int(user_id)
    )

    db.session.add(borrowed_book)

    db.session.commit()

    return jsonify({
        "message": "Book borrowed successfully"
    }), 201

    # Get Borrowed Books
@app.route("/borrowed", methods=["GET"])
@jwt_required()
def get_borrowed_books():

    user_id = get_jwt_identity()

    books = BorrowedBook.query.filter_by(
        user_id=int(user_id)
    ).all()

    borrowed_list = []

    for book in books:

        borrowed_list.append({
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "image": book.image,
            "status": book.status
        })

    return jsonify(borrowed_list), 200

    # Return Book
@app.route("/borrowed/<int:id>", methods=["DELETE"])
@jwt_required()
def return_book(id):

    user_id = get_jwt_identity()

    book = BorrowedBook.query.filter_by(
        id=id,
        user_id=int(user_id)
    ).first()

    if not book:

        return jsonify({
            "message": "Book not found"
        }), 404

    db.session.delete(book)

    db.session.commit()

    return jsonify({
        "message": "Book returned successfully"
    }), 200

    # Admin Dashboard Stats
@app.route("/admin/stats", methods=["GET"])
def admin_stats():

    total_users = User.query.count()

    total_favorites = Favorite.query.count()

    total_borrowed = BorrowedBook.query.count()

    return jsonify({
        "total_users": total_users,
        "total_favorites": total_favorites,
        "total_borrowed": total_borrowed
    }), 200

    # Dashboard Stats
@app.route("/dashboard/stats", methods=["GET"])
@jwt_required()
def dashboard_stats():

    current_user_id = get_jwt_identity()

    favorites_count = Favorite.query.filter_by(
        user_id=current_user_id
    ).count()

    borrowed_count = BorrowedBook.query.filter_by(
        user_id=current_user_id
    ).count()

    books_read = borrowed_count

    reading_hours = borrowed_count * 5

    return jsonify({
        "books_read": books_read,
        "favorites": favorites_count,
        "borrowed": borrowed_count,
        "reading_hours": reading_hours
    }), 200
# Chatbot Route
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message")

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:

        print("CHATBOT ERROR:", e)

        return jsonify({
            "reply": "Sorry, something went wrong."
        }), 500

import requests

# Search Books Route
@app.route("/books/search", methods=["GET"])
def search_books():

    query = request.args.get("q")

    try:

        response = requests.get(
            f"https://openlibrary.org/search.json?q={query}"
        )

        data = response.json()

        return jsonify(data)

    except Exception as e:

        print("BOOK SEARCH ERROR:", e)

        return jsonify({
            "message": "Failed to fetch books"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)