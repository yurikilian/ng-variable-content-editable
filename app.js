(function() {
    "use strict";

    angular.module("test", ["content-editable"]);
    angular.module("test").controller("TestController", TestController);

    function TestController() {
        var viewModel = this;
        viewModel.mensagem = "Bem vindo <button contenteditable-object>${NOMEASSOCIADO}</button>. Agora são  <button contenteditable-object>${DATAHORA}</button> ";
        viewModel.contentEditableHandler = {
            avoid: ["$", "{", "}"],
            model: "${?}"
        };

        viewModel.variaveis = [];
        viewModel.adicionar = adicionar;
        viewModel.posicao = posicao;

        function adicionar() {
            viewModel.mensagem += "<button contenteditable-object>" + viewModel.variavel + "</button>";
        }

        function posicao() {
            alert("ok");
        }
    }
}());
