<script>
    import {db} from '../main.js';
    import {collection,query, getDocs} from 'firebase/firestore';

    let valor = '';
    let optionA = '';
    let optionB = '';
    let optionC = '';
    let optionD = '';


    async function sendData(event){ // using firebase v9 
        event.preventDefault();
        const res = await query(collection(db,'questoes')); // remember to use a query object ! 
        const docs = await getDocs(res);
        docs.forEach(doc => {
            console.log(doc.data());
        })
    }

</script>

<main>
    <div class="flex-container">
    <form>
        <input class="form-control" type="text" bind:value={valor} placeholder="Enunciado da questão">
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
        <h3>{valor}</h3>
        <p>{optionA}</p>
        <br>
        <p>{optionB}</p>
        <br>
        <p>{optionC}</p>
        <br>
        <p>{optionD}</p>
        <br>
        <br>
        <p>Alternativa correta: &nbsp;</p>
        <select>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
        </select>
        <br>
        <br>
        <button type="submit" on:click={sendData}>Enviar formulário </button>
    </form>
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