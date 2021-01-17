var d = document;

var F_name;
var L_name;
var mail;
var group;
alert("первая проверка работает")
function newp()
{ alert("вторая проверка работает")
    // Считываем значения с формы
    F_name = d.getElementById('validationDefault01').value;
    L_name = d.getElementById('validationDefault02').value;
    mail = d.getElementById('validationDefault03').value;
    group = d.getElementById('validationDefault05').value;

    // Находим нужную таблицу
    var tbody = d.getElementById('tab1').getElementsByTagName('TBODY')[0];

    // Создаем строку таблицы и добавляем ее
    var row = d.createElement("TR");
    tbody.appendChild(row);

    // Создаем ячейки в вышесозданной строке
    // и добавляем тх
    var td1 = d.createElement("TD");
    var td2 = d.createElement("TD");
    var td3 = d.createElement("TD");
    var td4 = d.createElement("TD");

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    // Наполняем ячейки
    td1.innerHTML = group;
    td2.innerHTML = F_name;
    td3.innerHTML = L_name;
    td4.innerHTML = mail;
}