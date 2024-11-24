Create DATABASE DBmovie;

CREATE TABLE Movie (
    MovieID INT PRIMARY KEY,               -- Unique identifier for each movie
    Title VARCHAR(255) NOT NULL,           -- Movie title
    ReleaseDate DATE,                      -- Release date of the movie
    GenreID INT,                           -- Foreign key linking to Genre table
    DirectorID INT,                        -- Foreign key linking to Director table
    Popularity FLOAT,                      -- Popularity score of the movie
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID),
    FOREIGN KEY (DirectorID) REFERENCES Director(DirectorID)
);

CREATE TABLE Genre (
    GenreID INT PRIMARY KEY,        -- Unique identifier for each genre
    GenreName VARCHAR(100) NOT NULL -- Name of the genre (e.g., Action, Comedy)
);

CREATE TABLE MovieGenre (
    MovieGenreID SERIAL PRIMARY KEY, -- Unique ID for each row (optional, for internal reference)
    MovieID INT NOT NULL,           -- Foreign key linking to the Movie table
    GenreID INT NOT NULL,           -- Foreign key linking to the Genre table
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID),
    UNIQUE (MovieID, GenreID)       -- Ensure each movie-genre pair is unique
);

CREATE TABLE Director (
    DirectorID INT PRIMARY KEY,       -- Unique identifier for each director
    Name VARCHAR(255) NOT NULL,       -- Full name of the director
    BirthDate DATE                    -- Director's date of birth
);

CREATE TABLE Actor (
    ActorID INT PRIMARY KEY,          -- Unique identifier for each actor
    Name VARCHAR(255) NOT NULL,       -- Full name of the actor
    BirthDate DATE                    -- Actor's date of birth
);

CREATE TABLE Review (
    ReviewID INT PRIMARY KEY,          -- Unique identifier for each review
    MovieID INT,                       -- Foreign key linking to the Movie table
    UserID INT,                        -- Foreign key linking to the User table
    Rating SMALLINT CHECK (Rating BETWEEN 1 AND 5),  -- Rating scale from 1 to 5
    ReviewText TEXT,                   -- Optional text content of the review
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE MovieActor (
    MovieActorID SERIAL PRIMARY KEY,  -- Unique ID for each row
    MovieID INT NOT NULL,             -- Foreign key referencing Movie
    ActorID INT NOT NULL,             -- Foreign key referencing Actor
    CONSTRAINT fk_movie FOREIGN KEY (MovieID) REFERENCES Movie(MovieID) ON DELETE CASCADE,
    CONSTRAINT fk_actor FOREIGN KEY (ActorID) REFERENCES Actor(ActorID) ON DELETE CASCADE,
    UNIQUE (MovieID, ActorID)        -- Ensures that each actor appears only once per movie
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY,             -- Unique identifier for each user
    Username VARCHAR(50) NOT NULL,      -- Username of the user
    Email VARCHAR(100) NOT NULL UNIQUE, -- User's email address, must be unique
    Password VARCHAR(255) NOT NULL     -- Encrypted password for authentication
);



CREATE TABLE 