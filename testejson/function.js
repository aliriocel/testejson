$(function () {
    var operacao = "A";
    var indice_selecionado = -1;
    var tbClientes = localStorage.getItem("tbClientes");
    tbClientes = JSON.parse(tbClientes);
    if (tbClientes == null)
        tbClientes = [];
});

function Adicionar() {
    var cliente = JSON.stringify({
        Codigo: $("#txtCodigo").val(),
        Nome: $("#txtNome").val(),
        idade: $("#txtIdade").val(),
        qtd_beneficiarios: $("#txtBeneficiarios").val(),
        plano: $("#txtPlano").val()
    });
    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro adicionado.");
    return true;
}

function Editar() {
    tbClientes[indice_selecionado] = JSON.stringify({
        Codigo: $("#txtCodigo").val(),
        Nome: $("#txtNome").val(),
        idade: $("#txtIdade").val(),
        qtd_beneficiarios: $("#txtBeneficiarios").val(),
        plano: $("#txtPlano").val()
    });
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Informações editadas.")
    operacao = "A";
    return true;
}

function Excluir() {
    tbClientes.splice(indice_selecionado, 1);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro excluído.");
}

function Listar() {
    $("#tblListar").html("");
    $("#tblListar").html(
        "<thead>" +
        "   <tr>" +
        "   <th></th>" +
        "   <th>Código</th>" +
        "   <th>Nome</th>" +
        "   <th>Idade</th>" +
        "   <th>Nº de Beneficiários</th>" +
        "   <th>Plano</th>" +
        "   </tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
    );
    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append("<td><img src='edit.png' alt='" + i + "'
              class= 'btnEditar' /> <img src='delete.png' alt='"+i+"' class='btnExcluir' /></td > ");
        $("#tblListar tbody").append("<td>" + cli.Codigo + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Nome + "</td>");
        $("#tblListar tbody").append("<td>" + cli.idade + "</td>");
        $("#tblListar tbody").append("<td>" + cli.qtd_beneficiarios + "</td>");
        $("#tblListar tbody").append("<td>" + cli.plano + "</td>");
        $("#tblListar tbody").append("</tr>");
    }
}

$("#frmCadastro").on("submit", function () {
    if (operacao == "A")
        return Adicionar();
    else
        return Editar();
});


$("#tblListar").on("click", ".btnEditar", function () {
    operacao = "E";
    indice_selecionado = parseInt($(this).attr("alt"));
    var cli = JSON.parse(tbClientes[indice_selecionado]);
    $("#txtCodigo").val(cli.Codigo);
    $("#txtNome").val(cli.Nome);
    $("#txtIdade").val(cli.idade);
    $("#txtBeneficiarios").val(cli.qtd_beneficiarios);
    $("#txtPlano").val(cli.plano);
    $("#txtCodigo").attr("readonly", "readonly");
    $("#txtNome").focus();
});

$("#tblListar").on("click", ".btnExcluir", function () {
    indice_selecionado = parseInt($(this).attr("alt"));
    Excluir();
    Listar();
});

$.getJSON("beneficiarios.json", function( data ) {
    var registro = data.registro;
    
    $.each(data, function(codigo, nome, idade, qtd_beneficiarios, plano){
      registro.push("<li id='" + nome +"'>"+ idade + "</li>");
    });
    
    $("<ul/>", {
      "class": "my-new-list",
      html: registro.join("")
    }).appendTo("body");
    
    
    });