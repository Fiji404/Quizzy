const preferencesOptionList = document.querySelectorAll(".settings-options-list");
const preferencesOptions = document.querySelectorAll(".settings-options-list__item");
preferencesOptionList.forEach((listNode, idx)=>{
    listNode.addEventListener("click", ({ target  })=>{
        const childActiveClassElements = listNode.querySelectorAll(".active");
        childActiveClassElements.forEach((el)=>el.classList.remove("active"));
        target.classList.add("active");
        localStorage.setItem("option" + idx, target.textContent);
    });
});
preferencesOptions.forEach((el)=>{
    const localStorageValues = Object.values(localStorage);
    localStorageValues.forEach((value)=>{
        if (el.textContent === value) el.classList.add("active");
    });
});

//# sourceMappingURL=HTML-Quiz.b2b9097e.js.map
