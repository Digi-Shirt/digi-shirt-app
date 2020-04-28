/**
 * Action definitions to be used by Redux dispatcher
 */

export const UPDATE_NEWS_ITEMS = 'UPDATE_NEWS_ITEMS';

export const updateNewsItems = () => {
    return { type: UPDATE_NEWS_ITEMS }
}
