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

# Important

### All the content in this directory is being used during the Web Programming course, and the statements are authored by Professor Bruno Muller who teaches the course.
