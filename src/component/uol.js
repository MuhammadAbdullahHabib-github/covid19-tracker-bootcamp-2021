export const arrangment = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}