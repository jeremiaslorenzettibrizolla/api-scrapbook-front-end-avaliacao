const url = 'http://localhost:8080';
axios.defaults.baseURL = url;

async function loadTable() {
    const scrapbook = document.getElementById('scrapbook');

    const response = await axios.get('/messages');
    const data = response.data;

    scrapbook.innerHTML = '';

    if (data) {
        data.forEach((message) => {
        const line = document.createElement('tr');
            line.innerHTML = 
            `
                <th scope="row" class"text-cel" id="${message.id}">${message.id}</th>
                <td class"text-cel">${message.description}</td>
                <td class"text-cel">${message.details}</td>
                <td>
                    <div>
                        <button class="col-1 btnAction btn-edit" onclick="updateMessage(event, ${message.id})">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button class="col-1 btnAction btn-delete" onclick="deleteMessage(event, ${message.id})">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            scrapbook.appendChild(line);
        });
    };
};
loadTable();


async function saveMessage(event) {
    event.preventDefault();
    const id = document.getElementById('id');
    const description = document.getElementById('description');
    const details = document.getElementById('details');
  
    if (!description.value) {
      document.getElementById('scrap-error').classList.remove('none');
      setTimeout(() => {
        document.getElementById('scrap-error').classList.add('none');
      }, 2000);
      return;
    }

    const message = {
        description: description.value,
        details: details.value,
    }
    
    if (!id.value) {
        response = await axios.post('/message', message);
    } else  {
        response = await axios.put(`/messages/${editId}`, message);
    }
  
    if (response.status == 200) {
        loadTable();
        document.getElementById('scrap-sucess').classList.remove('none');
        setTimeout(() => {
            document.getElementById('scrap-sucess').classList.add('none');
        }, 2000);
    }
    id.value = '';
    description.value = '';
    details.value = '';
}

async function updateMessage(event, id) {
    event.preventDefault();

    await axios.get(`/messages/${id}`)
        .then(function(data){
            editId = data.data.id;
            editDescription = data.data.description;
            editDetails = data.data.details;
        });

    document.getElementById('id').value = editId;
    document.getElementById('description').value = editDescription;
    document.getElementById('details').value = editDetails;

    loadTable();
}

async function deleteMessage(event, id) {
    event.preventDefault();
    let response = await axios.delete(`/messages/${id}`);
    loadTable();
};