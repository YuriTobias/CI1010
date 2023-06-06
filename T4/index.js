let student = [];
let subjects = [
    ["CI068", "CI210", "CI212", "CI215", "CI162", "CI163", "CI221", "OPT1"],
    ["CI055", "CI056", "CI057", "CI062", "CI065", "CI165", "CI211", "OPT2"],
    ["CM046", "CI067", "CI064", "CE003", "CI059", "CI209", "OPT3", "OPT4"],
    ["CM045", "CM005", "CI237", "CI058", "CI061", "CI218", "OPT5", "OPT6"],
    ["CM201", "CM202", "CI166", "CI164", "SA214", "CI220", "CI233", "CI234"],
];
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
    let alunos = xmlDoc.getElementsByTagName("ALUNO");
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].childNodes[3].firstChild.data == grr) {
            student.push(alunos[i]);
        }
    }
    updateTable();
}

function updateTable() {
    var subject;
    var sigla;
    for (let i = 0; i < student.length; i++) {
        sigla = student[i].childNodes[53].firstChild.data;
        subject = student[i].childNodes[29].firstChild.data;
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

                case "Tr. Total":
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
        clickHandler($(this).attr("id"), event.which);
    });
});

function clickHandler(subject, mouseSide) {
    let code,
        name,
        answer,
        aux,
        present = false;
    let year = [],
        semester = [],
        grade = [],
        frequency = [];

    for (let i = 0; i < student.length; i++) {
        if (student[i].childNodes[29].firstChild.data == subject) {
            code = student[i].childNodes[29].firstChild.data;
            name = student[i].childNodes[31].firstChild.data;
            year.push(student[i].childNodes[19].firstChild.data);
            semester.push(student[i].childNodes[25].firstChild.data);
            grade.push(student[i].childNodes[21].firstChild.data);
            frequency.push(parseFloat(student[i].childNodes[47].firstChild.data.replace(",", ".")).toFixed(2));
            present = true;
        }
    }
    if (present && mouseSide == 3) {
        aux = "Histórico do aluno na disciplina:\n\n" + "Código: " + code + "\nNome: " + name;
        for (let i = 0; i < frequency.length; i++) {
            aux = aux.concat(
                "\n\nAno/Semestre: " + year[i] + "/" + semester[i] + "\nMédia Final: " + grade[i] + "\nFrequência: " + frequency[i]
            );
        }
        answer = aux;
    } else if (present && mouseSide == 1) {
        answer =
            "Dados da última vez em que a disciplina foi cursada:\n\n" +
            "Código: " +
            code +
            "\nNome: " +
            name +
            "\nAno: " +
            year[year.length - 1] +
            "\nSemestre: " +
            semester[year.length - 1] +
            "\nMédia Final: " +
            grade[year.length - 1] +
            "\nFrequência: " +
            frequency[year.length - 1];
    } else {
        answer = "A disciplina " + subject + " ainda não foi cursada!";
    }

    window.alert(answer);
}

function clear() {
    student = [];
    for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < subjects[i].length; j++) {
            document.getElementById(subjects[i][j]).style.backgroundColor = "#f4f4f2";
            document.getElementById(subjects[i][j]).style.color = "black";
        }
    }
}
