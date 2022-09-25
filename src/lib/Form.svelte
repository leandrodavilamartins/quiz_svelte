<script>
    import {db} from '../main.js';
    import {collection,query, getDocs, doc, addDoc} from 'firebase/firestore';

    let enunc = '';
    let optionA = '';
    let optionB = '';
    let optionC = '';
    let optionD = '';
    let optionE = '';
    let correta = '';
    let area = '';
    let freq = 0;
    let acertos = 0;
    let erros = 0;
    let comentario = '';
    let success = false;


    async function getData(event){ // using firebase v9 
        event.preventDefault();
        const res = await query(collection(db,'questoes')); // remember to use a query object ! 
        const docs = await getDocs(res);
        docs.forEach(doc => {
            console.log(doc.data());
        })
    }

    async function sendData(event){ // this function create the question object and send the data to firebase firestore 
        event.preventDefault();
        const obj = {
            "enunc": enunc,
            "optionA": optionA,
            "optionB": optionB,
            "optionC": optionC,
            "optionD": optionD,
            "optionE": optionE,
            "correta": correta,
            "area": area,
            "freq": freq,
            "acertos": acertos,
            "erros": erros,
            "comentario": comentario
        }
        zerarCampos();
        console.log(obj);
        const docRef = await addDoc(collection(db,'questoes'),{obj});
        console.log(docRef.id);
        let id = await docRef.id;
        if(id){
            success = true;
        }
    }

    function zerarCampos(event){
        enunc = '';
        optionA = '';
        optionB = '';
        optionC = '';
        optionD = '';
        optionE = '';
        correta = '';
        area = '';
        comentario = '';
    }

</script>

<main>
    <div class="flex-container">
    <form>
        <input class="form-control" type="text" bind:value={enunc} placeholder="Enunciado da questão">
        <br>
        <br>
        <br>
        <p>a.&nbsp;&nbsp;</p><input class="form-control" type="text" placeholder="Digite a alternativa A" bind:value={optionA}>
        <br>
        <p>b.&nbsp;&nbsp;</p><input class="form-control" type="text" placeholder="Digite a alternativa B" bind:value={optionB}>
        <br>
        <p>c.&nbsp;&nbsp;</p><input class="form-control" type="text" placeholder="Digite a alternativa C" bind:value={optionC}>
        <br>
        <p>d.&nbsp;&nbsp;</p><input class="form-control" type="text" placeholder="Digite a alternativa D" bind:value={optionD}>
        <br>
        <p>e.&nbsp;&nbsp;</p><input class="form-control" type="text" placeholder="Digite a alternativa E" bind:value={optionE}>
        <br>
        <br>
        <p>Área de conhecimento: &nbsp;</p>
        <select bind:value={area}>
            <option value="leg">Clínica</option>
            <option value="clin">Legislação</option>
        </select>
        <br>
        <br>
        <p>Alternativa correta: &nbsp;</p>
        <select bind:value={correta}>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
        </select>
        <br>
        <br>
        <input class="form-control" type="text" placeholder="Clique no campo para adicionar comentário ..." bind:value={comentario}>
        <br>
        <br>
        <button type="submit" on:click={sendData}>Enviar formulário </button>
        <button class="btn-danger" on:click={zerarCampos}>Limpar Campos</button>
    </form>
    </div>
    <div>
        {#if success}
        <p>Questão adicionada com sucesso!</p>
        {/if}
    </div>
</main>

<style>
    .flex-container{
        display: flex;
    }
    
    form{
        width:100%;
    }
    p {
        display: inline-block;
    }
    input {
        margin: auto;
        width: 70%;
        display: inline;
    }
</style>