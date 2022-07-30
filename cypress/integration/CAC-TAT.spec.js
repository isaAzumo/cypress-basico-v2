/// <reference types="Cypress" />

const { should } = require("chai")

describe('Central de Atendimento ao Cliente TAT', function() { //suite de testes
beforeEach(function(){
    cy.visit('src/index.html') //visita o site
})
    it('verifica o título da aplicação', function() { //define um caso de teste
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //valida texto aba navegador
        
        //.type - digitar .click - clicar cy.get - identificar campo

    })

    it('preenche os campos obrigatórios e envia o formulário', function() { //define um caso de teste
        //.only - so executa aquele teste
        const longText = 'teste,teste,tetetete,ywe4yuwe,gtgedryhe4ryheadrfherf'
        cy.get('#firstName').type('Isabela')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('isabela.carneiro@azumo.co')
        cy.get('#open-text-area').type(longText, {delay: 0}) //delay p textos longos
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() { //define um caso de teste
        cy.get('#firstName').type('Isabela')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('isabela.carneiro@azumo,co')
        cy.get('#open-text-area').type('teste') 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') //error p validar erros nos campos e mensagens
    })

    it('campo de telefone continua vazio quando preenchido cm valor nao-numerico', function() { //define um caso de teste
        cy.get('#phone')
            .type('aahahaha')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { //define um caso de teste
        cy.get('#firstName').type('Isabela')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('isabela.carneiro@azumo.co')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste') 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible') 
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() { //define um caso de teste
        //.clear limpa os campos
        cy.get('#firstName')
        .type('Isabela')
        .should('have.value', 'Isabela')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Santana')
        .should('have.value', 'Santana')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('isabela.carneiro@azumo.co')
        .should('have.value', 'isabela.carneiro@azumo.co')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('teste')
        .should('have.value', 'teste')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() { //define um caso de teste
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })

    /*  it.only('envia o formuário com sucesso usando um comando customizado', function() { //define um caso de teste
        cy.fillMandatoryFieldsAndSubmit() //comando customizado p termos menos linha de codigo
        cy.get('.success').should('be.visible') 
    }) */

    //select - combos
    it('seleciona um produto (YouTube) por seu txto', function() { //define um caso de teste
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube') //youtube cm letra minuscula
    })

    it('seleciona um produto (Mentoria) por seu value', function() { //define um caso de teste
        cy.get('#product')
        .select('mentoria') //em minusculo p pegar pelo valor
        .should('have.value', 'mentoria') 
    })

    it('seleciona um produto (Blog) por seu indice', function() { //define um caso de teste
        cy.get('#product')
        .select(1) 
        .should('have.value', 'blog') 
    })
    //radiobutton
    it('marca o tipo de atendimento "Feedback"', function() { //define um caso de teste
        cy.get('input[type="radio"][value="feedback"]')
        .check() //checar radiobu
        .should('have.value', 'feedback') 
    })
    //selecionar todos os radios
    it('marca cada tipo de atendimento', function() { //define um caso de teste
        cy.get('input[type="radio"]') //pega todos tipo radio
        .should('have.length', 3) //pega a qtde de radios pelo lenght
        .each(function($radio){ //each passa por cada elemento
            cy.wrap($radio).check() //wrap empacota elemento 
            cy.wrap($radio).should('be.checked') //e verifica se foi marcado
        })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function() { //define um caso de teste
        cy.get('input[type="checkbox"]') //pega tds os campos do radio
        .check() //da o check nos campos
        .should('be.checked') //verifica se esta marcado
        .last() //pega o ultimo campo
        .uncheck() //dermarca o ultimo campo
        .should('not.be.checked') //verifica q nao esta checado
    })

    //selectFile seleciona um arquivo um anexo
    it('seleciona um arquivo da pasta fixtures', function() { //define um caso de teste
        cy.get('input[type="file"]') //pegar input file
        .should('not.have.value') //verifica q nao tem valor 
        .selectFile('./cypress/fixtures/example.json') //upload arquivo
        .should(function ($input) { //recebe elemento input
            //console.log(|$input) //mostra o elemento 
            expect($input[0].files[0].name).to.equal('example.json') //verifica retorno
       })

     })
     //arrasta o arquivo p campo anexar
     it('seleciona um arquivo simulando um drag-and-drop', function() { //define um caso de teste
        cy.get('input[type="file"]') //pegar input file
        .should('not.have.value') //verifica q nao tem valor 
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'} ) 
        .should(function ($input) { //recebe elemento input
            expect($input[0].files[0].name).to.equal('example.json') //verifica retorno
       })

  })

  it('seleciona um arquivo da pasta fixtures', function() { //define um caso de teste
    cy.get('input[type="file"]') //pegar input file
    .should('not.have.value') //verifica q nao tem valor 
    .selectFile('./cypress/fixtures/example.json') //upload arquivo
    .should(function ($input) { //recebe elemento input
        //console.log(|$input) //mostra o elemento 
        expect($input[0].files[0].name).to.equal('example.json') //verifica retorno
   })
  
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() { 
    cy.fixture('example.json').as('sampleFile') //passando o arquivo por meio de fikxture e usando samplefile cm exemplo de arquivo
    cy.get('input[type="file"]') //pega o tipo do campo
    .selectFile('@sampleFile')//seleciona o exemplo de arquivo
    .should(function ($input) {//passa o atributo input
        expect($input[0].files[0].name).to.equal('example.json') //pega os valore do campo e verifica se é igual ao arquivo correto
    })
  })

  //lidando cm links q abrem em outra aba
  //href tem um html q abre uma pagina e o target blank q todos os navegadores
  //abrem em uma nova aba
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() { //define um caso de teste
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        //seletor                       //atributo target blank
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() { //define um caso de teste
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')   //remove o target p nao abrir em outra aba usa o invoke                                                                                 
        .click()
        
       cy.contains('Talking About Testing').should('be.visible') 
        //verifica se possui o texto se e visivel abre na mesma aba 
    })
})
 