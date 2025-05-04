$(() => {

    const addModal = new bootstrap.Modal($("#add-modal")[0]);
    const editModal = new bootstrap.Modal($("#edit-modal")[0]);

    const refreshPeople = (cb) => {
        $("tbody tr:gt(0)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(person => {
                $("tbody").append(`<tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.age}</td>
                <td><button class= "btn btn-primary" id="show-edit" data-person-id="${person.id}">Update</button</td>
                <td><button class= "btn btn-danger" id="delete" data-person-id="${person.id}">Delete</button</td>
                </tr>`);
            })
            if (cb) {
                cb();
            }
        });

    }

    $("#show-add").on('click', function () {
        $("#add-firstName").val('');
        $("#add-lastName").val('');
        $("#add-age").val('');

        addModal.show();
    })

    $("#save-person").on('click', function () {
        const firstName = $("#add-firstName").val();
        const lastName = $("#add-lastName").val();
        const age = $("#add-age").val();

        $.post('/home/addperson', {
            firstName: firstName,
            lastName: lastName,
            age: age
        }, function () {
            refreshPeople();
            addModal.hide();

        });


    })

    $(".table").on('click', '#show-edit', function () {
        console.log('click');
        const button = $(this);
        const personId = button.data('person-id')
        console.log(personId)

        $.get('/home/getpersonbyid', {
            id: personId
        }, function ({firstName,lastName,age }) {
            $("#edit-firstName").val(firstName);
            $("#edit-lastName").val(lastName);
            $("#edit-age").val(age);
            editModal.show();
            
        })     
    })


    $("#update-person").on('click', function () {
        const button = $(this);
        const personId = button.data('person-id')
        const firstName = $("#edit-firstName").val();
        const lastName = $("#edit-lastName").val();
        const age = $("#edit-age").val();

        $.post('/home/updateperson', {
            id: personId,
            firstName: firstName,
            lastName: lastName,
            age: age
        }, function () {
            refreshPeople();
            editModal.hide();

        })
      
      

    })

    $(".table").on('click', '#delete', function () {

        const button = $(this);
        const personId = button.data('person-id')
        $.post('/home/deleteperson', {
           id: personId
        }, function () {
            refreshPeople();
           
        });  
    })




    refreshPeople();
})