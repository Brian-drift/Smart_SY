const mockClasses = [
    {
        id : "1",
        title: "Scientifique",
        diminutif: "Sci",
        categorie : "Scientifique"
    },{
        id : "2",
        title: "Commerciale & géstion",
        diminutif: "CG",
        categorie : "Thecnique"
    },{
        id : "3",
        title: "Littéraire",
        diminutif: "Lit",
        categorie : "Scientifique"
    },{
        id : "4",
        title: "Peda Générale",
        diminutif: "Peda",
        categorie : "Scientifique"
    },{
        id : "5",
        title: "Education De Base",
        diminutif: "EB",
        categorie : "Scientifique"
    },
];

export const fetchClassesGala = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockClasses);
        }, 1000)
    })
}