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
    clear();
    var xmlDoc = xml.responseXML;
    // console.log(xmlDoc);
    let alunos = xmlDoc.getElementsByTagName("ALUNO");
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].childNodes[3].firstChild.data == grr) {
            student.push(alunos[i]);
        }
    }
    // console.log(student);
    updateTable();
}

function updateTable() {
    // Falta limpar a tabela antes de criar uma nova
    var subject;
    var sigla;
    for (let i = 0; i < student.length; i++) {
        sigla = student[i].childNodes[53].firstChild.data;
        // console.log(sigla);
        subject = student[i].childNodes[29].firstChild.data;
        // console.log(subject);
        // Falta adicionar uma nova tabela com todas as matérias optativas
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
        // console.log($(this).attr("id"));
        // console.log(event.which);
        switch (event.which) {
            case 1:
                leftClickHandler($(this).attr("id"));
                break;

            case 3:
                rightClickHandler($(this).attr("id"));
                break;

            default:
                break;
        }
    });
});

// Falta tratar as matérias que ainda não foram cursadas
function leftClickHandler(subject) {
    let code, name, year, semester, grade, frequency, answer;
    for (let i = 0; i < student.length; i++) {
        if (student[i].childNodes[29].firstChild.data == subject) {
            code = student[i].childNodes[29].firstChild.data;
            name = student[i].childNodes[31].firstChild.data;
            year = student[i].childNodes[19].firstChild.data;
            semester = student[i].childNodes[25].firstChild.data;
            grade = student[i].childNodes[21].firstChild.data;
            frequency = parseFloat(student[i].childNodes[47].firstChild.data.replace(",", ".")).toFixed(2);
        }
    }
    answer =
        "Dados da última vez em que a disciplina foi cursada:\n\n" +
        "Código: " +
        code +
        "\nNome: " +
        name +
        "\nAno: " +
        year +
        "\nSemestre: " +
        semester +
        "\nMédia Final: " +
        grade +
        "\nFrequência: " +
        frequency;
    window.alert(answer);
}

function rightClickHandler(subject) {
    let code,
        name,
        year = [],
        semester = [],
        grade = [],
        frequency = [],
        answer,
        aux;
    for (let i = 0; i < student.length; i++) {
        if (student[i].childNodes[29].firstChild.data == subject) {
            code = student[i].childNodes[29].firstChild.data;
            name = student[i].childNodes[31].firstChild.data;
            year.push(student[i].childNodes[19].firstChild.data);
            semester.push(student[i].childNodes[25].firstChild.data);
            grade.push(student[i].childNodes[21].firstChild.data);
            frequency.push(parseFloat(student[i].childNodes[47].firstChild.data.replace(",", ".")).toFixed(2));
        }
    }
    aux = "Histórico do aluno na disciplina:\n\n" + "Código: " + code + "\nNome: " + name;
    for (let i = 0; i < frequency.length; i++) {
        // console.log("Entrei");
        // console.log(aux);
        aux = aux.concat("\nAno/Semestre: " + year[i] + "/" + semester[i] + "\nMédia Final: " + grade[i] + "\nFrequência: " + frequency[i]);
    }
    answer = aux;
    window.alert(answer);
}

function clear() {
    student = [];
}
