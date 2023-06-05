let student = [];
var xhttp;

function loadXml() {
    $(".visualizeitor-searchbar-form").submit(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                xmlHandler(this, document.getElementById("ra-input").value);
            }
        };
        xhttp.open("GET", "./resources/alunos.xml", true);
        xhttp.send();
    });
}

function xmlHandler(xml, grr) {
    var xmlDoc = xml.responseXML;
    // console.log(xmlDoc);
    let alunos = xmlDoc.getElementsByTagName("ALUNO");
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].childNodes[3].firstChild.data == grr) {
            student.push(alunos[i]);
        }
    }
    console.log(student);
    updateTable();
    clear();
}

function updateTable() {
    //falta limpar a tabela antes de criar uma nova
    var subject;
    var sigla;
    for (let i = 0; i < student.length; i++) {
        sigla = student[i].childNodes[53].firstChild.data;
        console.log(sigla);
        subject = student[i].childNodes[29].firstChild.data;
        console.log(subject);
        if (document.getElementById(subject) != null) {
            switch (sigla) {
                case "Aprovado":
                    document.getElementById(subject).style.backgroundColor = "green";
                    document.getElementById(subject).style.color = "white";
                    break;

                case "Disp. c/nt":
                    document.getElementById(subject).style.backgroundColor = "green";
                    document.getElementById(subject).style.color = "white";
                    break;

                case "Reprovado":
                    document.getElementById(subject).style.backgroundColor = "red";
                    document.getElementById(subject).style.color = "white";
                    break;

                case "Repr. Freq":
                    document.getElementById(subject).style.backgroundColor = "red";
                    document.getElementById(subject).style.color = "white";
                    break;

                case "Matricula":
                    document.getElementById(subject).style.backgroundColor = "blue";
                    document.getElementById(subject).style.color = "white";
                    break;

                case "Equivale":
                    document.getElementById(subject).style.backgroundColor = "yellow";
                    document.getElementById(subject).style.color = "black";
                    break;

                case "Cancelado":
                    document.getElementById(subject).style.backgroundColor = "white";
                    document.getElementById(subject).style.color = "black";
                    break;

                default:
                    break;
            }
        }
    }
}

$(document).ready(function () {
    $("td").mousedown(function (event) {
        console.log($(this).attr("id"));
        console.log(event.which);
        switch (event.which) {
            case 1:
                //window.alert("esquerdo");
                break;

            case 3:
                //window.alert("direito");
                break;

            default:
                break;
        }
    });
});

function clear() {
    student = [];
}
