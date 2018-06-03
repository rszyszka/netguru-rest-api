export const response = (res, status) => (entity) => {
    if (entity) {
        res.status(status || 200).json(entity);
    }
    return null;
};