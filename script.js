'use strict';

const api = 'http://localhost:3000';

function callAPI (method, endpoint, body) {
  return fetch(api + endpoint, { method: method, body: JSON.stringify(body) })
    .then(res => res.json())
    .catch(err => {
      setTimeout(() => alert('Проверьте подключение к серверу ;('));
      throw err; 
    });
}

function add () { // eslint-disable-line
  const Fname = $('#new_Fname');
  const Lname = $('#new_Lname');
  const group = $('#new_group');
  const mail = $('#new_mail');
  const newObj = {
    Fname: Fname.val(),
    Lname: Lname.val(),
    group: group.val(),
    mail: mail.val()
  };
  if (newObj.Fname) {
    callAPI('POST', '/guide', newObj).then(id => {
      $('#guides').append(buildRow(id, newObj));
      Fname.val('');
      Lname.val('');
      group.val('');
      mail.val('');
    });
  }
}

function del (row) {
  const id = row.children('td')[0].innerText;
  callAPI('DELETE', '/guide/' + id).then(() => row.remove());
}

function edit (btn, id, fields) {
  btn.removeClass('fa-edit')
    .addClass('fa-save')
    .off('click')
    .click(() => save(btn, id, fields));

  for (const i of fields) {
    const value = $(i).text();
    $(i).html('')
      .append($('<input/>', { type: 'text', class: 'form-control', value: value }));
  }
}

function save (btn, id, fields) {
  const values = fields.map(function () { return this.firstElementChild.value; });
  const obj = {
    Fname: values[0],
    Lname: values[1],
    group: values[2],
    mail: values[3]
  };

  if (obj.Fname) {
    callAPI('PUT', '/guide/' + id, obj).then(() => {
      for (let i = 0; i < values.length; i++) {
        $(fields[i]).text(values[i]);
      }
      btn.removeClass('fa-save')
        .addClass('fa-edit')
        .off('click')
        .click(() => edit(btn, id, fields));
    });
  } 
}

function buildRow (id, guide) {
  const row = $('<tr/>');
  const cols = [id.toString(), guide.group, guide.Fname, guide.Lname, guide.mail];

  for (const i of cols) row.append($('<td/>', { text: i }));

  const buttons = $('<div/>', { class: 'w-100 btn-group' });
  const editButton = $('<button/>', { class: 'btn btn-success' });
  const deleteButton = $('<button/>', { class: 'btn btn-danger'});

  const fields = row.children('td').slice(1, 4);
  editButton.click(function () { edit($(this), id, fields); });
  deleteButton.click(function () { del(row); });

  buttons.append(editButton)
    .append(deleteButton);

  row.append($('<td/>').append(buttons));

  return row;
}

function init (data) {
  const guides = $('#guides');
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null) continue;
    guides.append(buildRow(i, data[i]));
  }
}

$(document).ready(function () {
  callAPI('GET', '/guide').then(init);
});