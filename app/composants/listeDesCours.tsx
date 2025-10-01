const mockCours4emes = [
    {
        id : "1",
        title: "Math",
        editeur : "Mr 🏆",
        classe : "4 éme const"
    },
    {
        id : "2",
        title: "Français",
        editeur : "Mr Lambert",
        classe : "4 éme const"
    },
    {
        id : "3",
        title: "Englais",
        editeur : "Mr Jhon",
        classe : "4 éme const"
    },
    {
        id : "4",
        title: "Réligion",
        editeur : "Mr Pascal",
        classe : "4 éme const"
    },
    {
        id : "5",
        title: "Technologies des bâtiments",
        editeur : "Mr Salem",
        classe : "4 éme const"
    },
    {
        id : "6",
        title: "Déssin",
        editeur : "Mr Françis",
        classe : "4 éme const"
    },
    {
        id : "7",
        title: "Béton",
        editeur : "Mr Françis",
        classe : "4 éme const"
    },
    {
        id : "8",
        title: "Métre",
        editeur : "Mr salem",
        classe : "4 éme const"
    },
    {
        id : "9",
        title: "Culture Génerale",
        editeur : "Mr Lambert",
        classe : "4 éme const"
    },
    {
        id : "10",
        title: "Assainissement",
        editeur : "Mr Costa",
        classe : "4 éme const"
    },
]
const mockCours3emes = [
    {
        id : "1",
        title: "Math",
        editeur : "Mr 🏆",
        classe : "3 éme const"
    },
    {
        id : "2",
        title: "Français",
        editeur : "Mr Lambert",
        classe : "3 éme const"
    },
    {
        id : "3",
        title: "Englais",
        editeur : "Mr Jhon",
        classe : "3 éme const"
    },
    {
        id : "4",
        title: "Réligion",
        editeur : "Mr Pascal",
        classe : "3 éme const"
    },
    {
        id : "5",
        title: "Technologies des bâtiments",
        editeur : "Mr Salem",
        classe : "3 éme const"
    },
    {
        id : "6",
        title: "Déssin",
        editeur : "Mr Françis",
        classe : "3 éme const"
    },
    {
        id : "7",
        title: "Béton",
        editeur : "Mr Françis",
        classe : "3 éme const"
    },
    {
        id : "8",
        title: "Métre",
        editeur : "Mr salem",
        classe : "3 éme const"
    },
    {
        id : "9",
        title: "Culture Génerale",
        editeur : "Mr Lambert",
        classe : "3 éme const"
    },
    {
        id : "10",
        title: "Assainissement",
        editeur : "Mr Costa",
        classe : "3 éme const"
    },
]
const mockCours2emes = [
    {
        id : "1",
        title: "Math",
        editeur : "Mr David",
        classe : "2 éme const"
    },
    {
        id : "2",
        title: "Français",
        editeur : "Mr Benîot",
        classe : "2 éme const"
    },
    {
        id : "3",
        title: "Englais",
        editeur : "Mr Jhon",
        classe : "2 éme const"
    },
    {
        id : "4",
        title: "Réligion",
        editeur : "Mr Pascal",
        classe : "2 éme const"
    },
    {
        id : "5",
        title: "Technologies des bâtiments",
        editeur : "Mr Costa",
        classe : "2 éme const"
    },
    {
        id : "6",
        title: "Déssin",
        editeur : "Mr Françis",
        classe : "2 éme const"
    },
    {
        id : "7",
        title: "CDM",
        editeur : "Mr Françis",
        classe : "2 éme const"
    },
    {
        id : "8",
        title: "Métre",
        editeur : "Mr salem",
        classe : "2 éme const"
    },
    {
        id : "9",
        title: "Culture Génerale",
        editeur : "Mr Lambert",
        classe : "2 éme const"
    },
    {
        id : "10",
        title: "Assainissement",
        editeur : "Mr Costa",
        classe : "2 éme const"
    },
]
const mockCours1er = [
    {
        id : "1",
        title: "Math",
        editeur : "Mr 🏆",
        classe : "1 er const"
    },
    {
        id : "2",
        title: "Français",
        editeur : "Mr Guyslin",
        classe : "1 er const"
    },
    {
        id : "3",
        title: "Englais",
        editeur : "Mr Jhon",
        classe : "1 er const"
    },
    {
        id : "4",
        title: "Réligion",
        editeur : "Mr Pascal",
        classe : "1 er const"
    },
    {
        id : "5",
        title: "Technologies des bâtiments",
        editeur : "Mr Costa",
        classe : "1 er const"
    },
    {
        id : "6",
        title: "Déssin",
        editeur : "Mr Françis",
        classe : "1 er const"
    },
    {
        id : "7",
        title: "CDM",
        editeur : "Mr Françis",
        classe : "1 er const"
    },
    {
        id : "8",
        title: "Métre",
        editeur : "Mr salem",
        classe : "1 er const"
    },
    {
        id : "9",
        title: "Culture Génerale",
        editeur : "Mr Lambert",
        classe : "1 er const"
    },
    {
        id : "10",
        title: "Assainissement",
        editeur : "Mr Costa",
        classe : "1 er const"
    },
]

export const fetchCours4eme = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCours4emes);
        }, 1000)
    })
}
export const fetchCours3eme = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCours3emes);
        }, 1000)
    })
}
export const fetchCours2eme = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCours2emes);
        }, 1000)
    })
}
export const fetchCours1er = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCours1er);
        }, 1000)
    })
}