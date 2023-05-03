// open form model and close
let addNewBtn = document.querySelector(".addCollege");
let closeFormBtn = document.querySelector(".addNewCollege .close");
let formSection = document.querySelector(".form");
let collegeForm = document.querySelector(".form .addNewCollege");

addNewBtn.addEventListener('click', () => {
    formSection.classList.add("overlay");
    collegeForm.style.display = "block";
});
closeFormBtn.addEventListener('click', () => {
    formSection.classList.remove("overlay");
    collegeForm.style.display = "none";
});
// -----------------------------------------------------------//
// create array to store data
let saveData = localStorage.getItem("college");
let collegeList = JSON.parse(saveData || "[]");
// select the inputs of the form
let collegeFormName = document.getElementById("college_form_name");

// get last id
let lastCollegeId = collegeList.length;
// create a function to push new college into the array
let newCollege = () => {
    collegeList.push({
        collegeId: lastCollegeId += 1,
        collegeName: collegeFormName.value,
       
    });
}
// create render function to show data in the table
let collegeTableTbody = document.getElementById("tbody");
let renderColleges = () => {
    let tr = '';
    collegeList.forEach(college => {
        tr += `
            <tr data-id = ${college.collegeId}>
                <td>${college.collegeId}</td>
                <td>${college.collegeName}</td>
               
                <td class="green">Edit</td>
                <td class="red">Delete</td>
            </tr>
        `
    });
    collegeTableTbody.innerHTML = tr;
}
// intial start of web page
renderColleges();
// reset value function 
let resetValue = () => {
    collegeFormName.value = '';
    
};
// handel save btn listener
let saveBtn = document.querySelector(".save");
// add new college handler
let saveBtnHandler = () => {
    newCollege();
    localStorage.setItem("college", JSON.stringify(collegeList));
    resetValue();
    renderColleges();
    formSection.classList.remove("overlay");
    collegeForm.style.display = "none";
};
saveBtn.addEventListener('click', saveBtnHandler);
// logic to handel edit and delete
collegeTableTbody.addEventListener('click', e => {
    if (e.target.classList.contains("green")) {
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = parseInt(id) -1;
        //get values from array into the input values
        collegeFormName.value = collegeList[index].collegeName;
       
        //open form with overlay
        formSection.classList.add("overlay");
        collegeForm.style.display = "block";

        // update handler
        let updateHandler = () => {
            // new object with modified data
            let updatedCollege = {
                collegeId: parseInt(id),
                collegeName: collegeFormName.value,
                
            }
            // change the old object with new object
            collegeList[index] = updatedCollege;
            localStorage.setItem("college", JSON.stringify(collegeList));
            // close overlay and hide form
            formSection.classList.remove("overlay");
            collegeForm.style.display = "none";
            // reset data
            resetValue();
            // display (render data)
            renderColleges();
            // listener hander
            saveBtn.removeEventListener('click', updateHandler);
            saveBtn.addEventListener('click', saveBtnHandler)
        }
        saveBtn.removeEventListener('click', saveBtnHandler);
        saveBtn.addEventListener('click', updateHandler);
    }
    // **********DELETE***********
    if (e.target.classList.contains("red")) {
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = parseInt(id) - 1;
        collegeList.splice(index, 1);
        localStorage.setItem("college", JSON.stringify(collegeList));
        renderColleges();
    }
});
// search logic
let searchInput = document.getElementById("search");
let form = searchInput.parentElement;
let trs = document.querySelectorAll('tbody tr');
form.addEventListener('submit', e => e.preventDefault());
searchInput.addEventListener('keyup', () => {
    let searchInputValue = searchInput.value.toLowerCase();
    trs.forEach(tr => {
        trName = tr.children[1].textContent.toLowerCase();
        if (trName.includes(searchInputValue)) {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }
    })
});