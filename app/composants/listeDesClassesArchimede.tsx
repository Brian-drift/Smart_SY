const mockClasses = [
    {
        id : "1",
        title: "Construction Bâtiment",
        diminutif : "Cbât",
        categorie : "Thecnique"
    },{
        id : "2",
        title: "Eletronique",
        diminutif: "Elect°",
        categorie : "Thecnique"
    },{
        id : "3",
        title: "Construction Métallique",
        diminutif: "Cmét",
        categorie : "Thecnique"
    },{
        id : "4",
        title: "Electricité",
        diminutif: "Elec" ,
        categorie : "Thecnique"
    },{
        id : "5",
        title: "Hotélerie & Restauration",
        diminutif: "HR",
        categorie : "Thecnique"
    },{
        id : "6",
        title: "Mécanique Génerale",
        diminutif: "Méc Gén",
        categorie : "Thecnique"
    },{
        id : "7",
        title: "Mecanique Automobile",
        diminutif: "Méc Aut",
        categorie : "Thecnique"
    },{
        id : "8",
        title: "Chimie Industrielle",
        diminutif: "CI",
        categorie : "Thecnique"
    },{
        id : "9",
        title: "Education de base Tech",
        diminutif: "EB",
        categorie : "Thecnique"
    },{
        id : "10",
        title: "Mines et Géologie",
        diminutif: "Min Géo",
        categorie : "Thecnique"
    },
];

export const fetchClassesArc = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockClasses);
        }, 1000)
    })
}