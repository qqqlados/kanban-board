## Fetch-запити

Для спрощення завдання я використав звичайний метод fetch, але в реальних проектах я використовую або ж модифікований fetch від Next.js (з опціями кешування та іншими параметрами) і компонент Suspense для асинхронного завантаження компонентів, або ж такі бібліотеки як RTK Query чи Tanstack Query.
Тобто, було спеціально обрано мною використання станів для завантаження (loading) та помилки (errorFetching) в глобальному стані Redux Toolkit, що є поганою практикою - на своїх же проектах, я використовую надані властивості isLoading, isError і т.д. Тобто, з метою спрощення, було зроблено саме так.

## Redux Persist

Для зберігання позиції перетягнутих елементів Issue я спочатку хотів використати бібліотеку redux-persist, яка й призначена для конфігурації з Redux Toolkit. Під час конфігурації, мені так і не вдалось завантажувати issuesOrder в localStorage через даний інструмент, тому я вирішив написати вручну механізми зберігання. Також я спеціально обрав зберігати searchValue в SessionStorage, щоби при закритті вкладки користувачем не зберігалось агресивно searchValue й не заважало пошуку.
Через саме таку реалізацію, у коді присутні багато useEffect, що є не досить хорошою практикою, і я це розумію, але було вирішено вручну написати механізми через помилки в конфігурації бібліотеки redux-persist.

## Стилізація

Я використовував бібліотеку AntDesign, яка є чудовим рішенням, а також писав дизайн сам (наприклад для колонок та issue item, адже не знайшов потрібних заготовлених елементів). Тому прошу не оцінювати дизайн строго, адже я його навмисне робив простим, щоби він відповідав мінімальним потребам. На інших проектах, я намагаюсь створювати дизайн більш приємний та естетичний, зокрема користуюсь заготовленими елементами від тої ж Ant Design.
