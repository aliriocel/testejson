<?php

// Atribui o conteúdo do arquivo para variável $arquivo
$arquivo = file_get_contents('beneficiarios.json');

// Decodifica o formato JSON e retorna um Objeto
$json = json_decode($arquivo);

foreach($json as $registro):
    echo 'Código: ' . $registro->codigo . ' - Nome: ' . $registro->nome . ' - Idade: ' . $registro->idade . ' - Plano: ' . $registro->plano . ' - Quantidade de Beneficiários: ' . $registro->qtd_beneficiarios .'<br>';
endforeach;


