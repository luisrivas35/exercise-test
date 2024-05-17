DROP TABLE IF EXISTS LIBROS;

CREATE TABLE LIBROS (
	ID VARCHAR PRIMARY KEY,
	NOMBRE VARCHAR NOT NULL,
	PRECIO INT CHECK(PRECIO >= 0),
	AUTOR VARCHAR NOT NULL
);

SELECT * FROM LIBROS;

-- seeders
INSERT INTO LIBROS (ID, NOMBRE, PRECIO, AUTOR) VALUES 
('kLoMjD_TGnbkhYWn0gTY3', 'Lanzas Coloradas', 100, 'Romulo Gallegos'),
('z_FrmrjC3B-ttWgg4n7Tu', 'El viejo y el mar', 200, 'Ernest Hemingway'),
('HNBfPALqm5yshLPpeG22F', 'Sherlock Holmes', 200, 'Arthur Conan Doyle'),
('Asl75JopegH3F6DWwhIcv', 'Casas Muertas', 200, 'Romulo Gallegos');