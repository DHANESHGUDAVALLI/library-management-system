from extensions import db

# User Model
class User(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(80),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(200),
        nullable=False
    )

    def __repr__(self):

        return f"<User {self.username}>"


# Favorite Model
class Favorite(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(300),
        nullable=False
    )

    author = db.Column(
        db.String(300),
        nullable=False
    )

    image = db.Column(
        db.String(500),
        nullable=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    def __repr__(self):

        return f"<Favorite {self.title}>"
# Borrowed Book Model
class BorrowedBook(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(300),
        nullable=False
    )

    author = db.Column(
        db.String(300),
        nullable=False
    )

    image = db.Column(
        db.String(500),
        nullable=True
    )

    status = db.Column(
        db.String(50),
        default="Borrowed"
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    def __repr__(self):

        return f"<BorrowedBook {self.title}>"   