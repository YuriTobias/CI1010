# CI1010

Repository for the Web Programming discipline

# T1

## Trabalho 1 (HTML5/CSS): Página Pessoal

-   Objective: Create my own page using HTML5 and CSS3.
-   Characteristics:
    -   The page must have at least two frames: a smaller one on the left and a larger one on the right;
    -   On the left side, there must be hyperlinks that, when activated, update the frame on the right. I can only use HTML5 and CSS3;
    -   Notes:
        -   Avoid using the "iframe" and "frame" tag;
        -   Whenever possible, avoid using the "div" tag. Instead assemble the page with strcutural HTML5 tags;

# T2

## Trabalho 2 (Ruby): Banco de Dados usando ActiveRecord

-   Objective: Create and use a database with ActiveRecord
-   The teacher gave us a document that explain how to use Active Record with Ruby;
-   Characteristics:
    -   Create a database containing tables with (a) one-to-one, (b) one-to-many, (c) many-to-many relationships.
    -   The insertion, alteration and deletion of elements must be carried out according to what is indicated by the user in the command line. Commands: insert, modify and delete.
    -   Specification:
        -   < operation > can be "inclusion", "alteration", "exclusion", "list";
        -   < table > indicates the name of the table;
        -   { ... } indicates repetition;
        -   attribute = value indicates the value of the attribute involved in the operation;
    -   Examples:
        -   enter people last_name="Svendson" first_name="Tove" address="Borgvn 23" city="Sanches";
        -   list people;
        -   exclude people last_name="Svendson";
-   We should leave a file that includes 10 records (at least) to facilitate the correction. We cannot forget that when deleting a record in table A that is related to table B, all entries in B with that record in A must also be deleted. ActiveRecord does this automatically. We should use it.

# T3

## Trabalho 3 (Javascript/XML/AJAX/Query): Processador de retas e polígonos

-   Objective: change format and position of lines and polygons created on the html5 canvas
-   Characteristics:
    -   When opening the link, a straight line should appear. If the user presses the mouse on one of the corners, that corner of the line will be moved while the other corner of the line is fixed. If the mouse is pressed in the center of the line, the whole line must be moved;
    -   When clicking with the right mouse button, the two corners of the line are fixed and the line is divided in two. One endpoint at each fixed point and one endpoint at the mouse location;
    -   The app should ask for a number (between 3 and 8) and generate a polygon with that number of sides. At each line segment, the two actions described above must operate. For example, it is possible to turn a triangle into a square by pressing the right button on one of the triangle's lines.

# Important

### All the content in this directory is being used during the Web Programming course, and the statements are authored by Professor Bruno Muller who teaches the course.
