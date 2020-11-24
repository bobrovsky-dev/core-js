import Type from "./type"

export default class Event
{
    constructor()
    {
        /**
         * Наименование события. Обработчики могут использовать
         * @type {string}
         */
        this.name = ""

        /**
         * Определяет, является ли событие обработанным. Когда установлено в `true`,
         * @type {boolean}
         */
        this.handled = false

        /**
         * Данные, которые приходят из [[Event.on()]] когда прикрепляется обработчик события.
         * @type {*}
         */
        this.data = {}

        /**
         * Содержит все зарегистрированные события.
         * @type {WeakMap}
         */
        this.events = new WeakMap()
    }

    /**
     * Получает массив событий из WeakMap
     * @param {Object} eventObject
     * @returns {Object}
     */
    _get(eventObject)
    {
        return this.events.get(eventObject) || {}
    }

    /**
     * Прикрепляет обработчик события к объекту.
     * @param {Object|string} eventObject
     * @param {string|Function} eventName
     * @param {Function|null} eventHandler
     * @param {*} data
     * @param {boolean|null} append
     */
    on(eventObject, eventName, eventHandler, data = null, append = true)
    {
        if (Type.isString(eventObject))
        {
            append = Type.isNull(data) ? true : data
            data = eventHandler || null
            eventHandler = eventName
            eventName = eventObject
            eventObject = window
        }

        if (
            !Type.isFunction(eventHandler) ||
            Type.isEmpty(eventName) ||
            !Type.isObject(eventObject)
        )
            return

        eventName = eventName.toLowerCase()

        let events = this._get(eventObject)

        if (!Type.isArray(events[eventName]))
            events[eventName] = []

        if (!!append)
            events[eventName].push([eventHandler, data])
        else
            events[eventName].unshift([eventHandler, data])

        this.events.set(eventObject, events)
    }

    /**
     * Открепляет обработчик события от объекта.
     * @param {Object|string} eventObject
     * @param {string|Function} eventName
     * @param {Function|undefined} eventHandler
     * @returns {boolean}
     */
    off(eventObject, eventName, eventHandler)
    {
        if (Type.isString(eventObject))
        {
            eventHandler = eventName
            eventName = eventObject
            eventObject = window
        }

        eventName = eventName.toLowerCase()

        let events = this._get(eventObject)

        if (Type.isNull(eventHandler))
        {
            delete events[eventName]
            return true
        }

        let removed = false

        if (events && Type.isArray(events[eventName]))
        {
            events[eventName].forEach(function (event, i) {
                if (event[0] === eventHandler)
                {
                    events[eventName].splice(i, 1)
                    removed = true
                }
            })
        }

        return removed
    }

    /**
     * Вызывает событие объекта.
     * @param {Object|string} eventObject
     * @param {string|Object} eventName
     * @param {Array|null} eventParams
     * @param {Event} event
     */
    trigger(eventObject, eventName, eventParams = null, event = null)
    {
        if (Type.isString(eventObject))
        {
            event = eventParams || null
            eventParams = eventName || []
            eventName = eventObject
            eventObject = window
        }

        if (eventParams === null)
            eventParams = []

        eventName = eventName.toLowerCase()

        let globalEvents = this._get(window)
        let globalHandlers = globalEvents && Type.isArray(globalEvents[eventName]) ? globalEvents[eventName] : []
        let objectHandlers = []

        if (eventObject !== window && Type.isObject(eventObject))
        {
            let objectEvents = this._get(eventObject)
            if (objectEvents && Type.isArray(objectEvents[eventName]))
            {
                objectHandlers = objectEvents[eventName]
            }
        }

        let handlers = globalHandlers.concat(objectHandlers)

        if (event === null)
            event = new Event()

        event.handled = false
        event.name = eventName

        for (let i = 0; i <= handlers.length - 1; i++)
        {
            let handler = handlers[i]

            event.data = handler[1]

            if (eventParams.indexOf(event) < 0)
                eventParams.unshift(event)

            if (Type.isFunction(handler[0]))
                handler[0].apply(eventObject, eventParams)

            if (event.handled)
                break
        }

    }

}