var urlGetSistemas = 'http://localhost:3002/systens/';
var urlGetLogins = 'http://localhost:3001/logins/';
var urlGetLoginRules = 'http://localhost:3003/loginrules/';

var edtLogin = document.getElementById('edtLogin');
edtLogin.addEventListener('keypress', refreshAutoComplete);

var comboCidades = document.getElementById('cboSistemas');
comboCidades.addEventListener('change', refreshListaPermissoes);

var listagem = document.getElementById('listagem');

var btnTodas = document.getElementById('btnTodas');
btnTodas.addEventListener('click', checkAll);

var btnInverter = document.getElementById('btnInverter');
btnInverter.addEventListener('click', checkInvert);

var btnSalvar = document.getElementById('btnSalvar');
btnSalvar.addEventListener('click', persistDados);

var xhttp = new XMLHttpRequest();
xhttp.open('GET', urlGetSistemas, true);

xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    const data = JSON.parse(xhttp.responseText);
    let id = -1;
    data.forEach((sistema) => {
      id++;
      let opcao = document.createElement('option');
      opcao.value = sistema.idsystem;
      opcao.text = sistema.systemname;
      comboCidades.add(opcao, comboCidades.options[id]);
    });
  }
};

xhttp.send();

function checkAll() {
  let checkboxes = document.getElementsByName('ckbloginRules');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = true;
  }
}

function checkInvert() {
  let checkboxes = document.getElementsByName('ckbloginRules');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = !checkboxes[i].checked;
  }
}

function persistDados(e) {
  let IdSystem = comboCidades.options[comboCidades.selectedIndex].value;
  let IdLogin = 0;

  const getLogins = new XMLHttpRequest();
  getLogins.open('GET', urlGetLogins + edtLogin.value, true);
  getLogins.onreadystatechange = function () {
    if (getLogins.readyState == 4 && getLogins.status == 200) {
      const resultLogins = JSON.parse(getLogins.responseText);
      if (resultLogins.length === 1) {
        let IdLoginParam = 0;

        resultLogins.forEach((loginRule) => {
          IdLoginParam = loginRule.idlogin;
        });

        const insLoginRules = new XMLHttpRequest();
        insLoginRules.open('POST', urlGetLoginRules, true);
        insLoginRules.setRequestHeader(
          'Content-type',
          'application/json; charset=utf-8'
        );
        if (insLoginRules.readyState == 4 && insLoginRules.status == 200) {
          alert(insLoginRules.responseText);
        }

        let IdsRolesParamIns = [];
        let IdsRolesParamDel = [];
        let checkboxes = document.getElementsByName('ckbloginRules');

        for (var i = 0, n = checkboxes.length; i < n; i++) {
          IdsRolesParamDel.push(checkboxes[i].value);
          if (checkboxes[i].checked) {
            IdsRolesParamIns.push(checkboxes[i].value);
          }
        }

        let param = {
          IdLogin: IdLoginParam,
          IdsRoles: IdsRolesParamIns,
          IdsRolesDel: IdsRolesParamDel,
        };

        insLoginRules.send(JSON.stringify(param));
      } else {
        alert('Selecione Login Válido');
      }
    }
  };

  getLogins.send();
}

function refreshListaPermissoes(e) {
  let IdSystem = comboCidades.options[comboCidades.selectedIndex].value;
  let IdLoginParam = 0;
  const getLoginRules = new XMLHttpRequest();
  const getLogins = new XMLHttpRequest();

  if (edtLogin.value.length > 0) {
    getLogins.open('GET', urlGetLogins + edtLogin.value, true);
  } else {
    getLogins.open('GET', urlGetLogins + 'empty', true);
  }
  getLogins.onreadystatechange = function () {
    if (getLogins.readyState == 4 && getLogins.status == 200) {
      const resultLogins = JSON.parse(getLogins.responseText);
      if (resultLogins.length === 1) {
        resultLogins.forEach((loginRule) => {
          IdLoginParam = loginRule.idlogin;
        });

        if (IdSystem > 0) {
          getLoginRules.open(
            'GET',
            urlGetLoginRules +
              '?IdLogin=' +
              IdLoginParam +
              '&IdSystem=' +
              IdSystem,
            true
          );
          getLoginRules.onreadystatechange = function () {
            if (getLoginRules.readyState == 4 && getLoginRules.status == 200) {
              const resultLogins = JSON.parse(getLoginRules.responseText);
              let htmlListagem = '';
              resultLogins.forEach((loginRule) => {
                htmlListagem += ` <div>
                <input type = "checkbox"  name = "ckbloginRules" value = "${
                  loginRule.idrule
                }"  ${loginRule.permissao ? 'checked' : ' '}>
                <label for = "coding"> ${loginRule.rulename} </label>
              </div> `;
              });

              listagem.innerHTML = htmlListagem;
            }
          };
          getLoginRules.send();
        }
      } else {
        IdLoginParam = 0;
        if (IdSystem > 0) {
          getLoginRules.open(
            'GET',
            urlGetLoginRules +
              '?IdLogin=' +
              IdLoginParam +
              '&IdSystem=' +
              IdSystem,
            true
          );
          getLoginRules.onreadystatechange = function () {
            if (getLoginRules.readyState == 4 && getLoginRules.status == 200) {
              const resultLogins = JSON.parse(getLoginRules.responseText);
              let htmlListagem = '';
              resultLogins.forEach((loginRule) => {
                htmlListagem += ` <div>
                <input type = "checkbox"  name = "ckbloginRules" value = "${
                  loginRule.idrule
                }"  ${loginRule.permissao ? 'checked' : ' '}>
                <label for = "coding"> ${loginRule.rulename} </label>
              </div> `;
              });

              listagem.innerHTML = htmlListagem;
            }
          };
          getLoginRules.send();
        }
      }
    }
  };
  getLogins.send();
}

function refreshAutoComplete(e) {
  let digitado = this.value + e.key;
  if (digitado.length > 0) {
    const getLogins = new XMLHttpRequest();
    getLogins.open('GET', urlGetLogins + digitado, true);
    getLogins.onreadystatechange = function () {
      if (getLogins.readyState == 4 && getLogins.status == 200) {
        const resultLogins = JSON.parse(getLogins.responseText);
        const options = [];
        resultLogins.forEach((login) => {
          options.push(login.login);
        });
        $('#edtLogin').autocomplete({
          source: options,
        });
      }
    };
    getLogins.send();
  }
}
