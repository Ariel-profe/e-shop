export const truncateText = (word: string) => {

    if(word.length < 25) return word;
    return word.substring(0, 25) + '...';
};