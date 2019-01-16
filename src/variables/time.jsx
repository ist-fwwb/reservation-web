export const time = (id) => {
    if (id % 2 === 0)
        return String(id / 2) + ":00";
    else
        return String((id - 1 ) / 2) + ":30";
}