// Initial States
const countersInitialState = [
  {
    value: 0,
    inputValue: null,
    hasDeleteButton: false,
  },
];

// Reducers
const countersReducer = (state = countersInitialState, action) => {
  // Add
  if (action.type === "add") {
    return [
      ...state,
      {
        value: 0,
        hasDeleteButton: true,
      },
    ];

    // Remove
  } else if (action.type === "remove") {
    return [
      ...state.slice(0, action.payload.counterIndex),
      ...state.slice(action.payload.counterIndex + 1),
    ];

    // Reset
  } else if (action.type === "reset") {
    return state.map((counter) => {
      return Object.assign({}, counter, {
        value: 0,
        inputValue: null,
      });
    });

    // Increase
  } else if (action.type === "increase") {
    return state.map((counter, index) => {
      if (index == action.payload.counterIndex)
        return Object.assign({}, counter, {
          value: counter.value + action.payload.inputValue,
          inputValue: action.payload.inputValue,
        });
      return counter;
    });

    // Decrease
  } else if (action.type === "decrease") {
    return state.map((counter, index) => {
      if (index == action.payload.counterIndex)
        return Object.assign({}, counter, {
          value:
            counter.value > 0 && counter.value - action.payload.inputValue > 0
              ? counter.value - action.payload.inputValue
              : 0,
          inputValue: action.payload.inputValue,
        });
      return counter;
    });

    // Initial
  } else {
    return state;
  }
};

// Stores
const countersStore = Redux.createStore(countersReducer);

// Renders
const countersRenders = () => {
  const currentState = countersStore.getState();

  document.querySelector(".counters").innerHTML = "";

  currentState.map((counter, index) => {
    document.querySelector(".counters").innerHTML += `
        <div class="counter-${index} relative p-5 dark:bg-slate-800 rounded-lg">
            ${
              counter.hasDeleteButton
                ? `
            <button
                class="absolute top-[-15px] right-[-15px] mt-5 w-[30px] h-[30px] rounded-[50%] bg-red-500 text-white"
                onclick="remove(${index})"
            >
                <span class="inline-block" style="margin-bottom: 3px">-</span>
            </button>
            `
                : ""
            }

            <h2
            id="counterValue"
                class="relative z-10 mb-5 text-2xl font-bold text-center text-[#38bdf8]"
            >${counter.value}</h2>

            <div class="relative z-10 mb-2 w-[100%] py-3 bg-slate-100 rounded-lg text-base font-normal text-center text-slate-900 dark:bg-slate-600 dark:text-slate-400 dark:highlight-white/10">
                <input type="text" ${
                  counter.inputValue ? `value="${counter.inputValue}"` : null
                } placeholder="Value" class="counter-${index}-input w-[100%] text-center text-white">
            </div>

            <div class="flex">
                <button class="relative z-10 mr-2 w-[120px] py-3 bg-slate-100 rounded-lg text-base font-medium text-center text-slate-900 dark:bg-slate-600 dark:text-slate-400 dark:highlight-white/10" onclick="decrease(${index})">
                    Decrease
                </button>

                <button class="relative z-10 w-[120px] py-3 bg-sky-500 rounded-lg text-base font-medium text-center text-white dark:highlight-white/20" onclick="increase(${index})">
                    Increase
                </button>
            </div>
        </div>
    `;
  });
};

countersRenders();

// Subscriptions
countersStore.subscribe(countersRenders);

// Events
const add = () => {
  countersStore.dispatch({
    type: "add",
  });
};

const remove = (counterIndex) => {
  countersStore.dispatch({
    type: "remove",
    payload: {
      counterIndex,
    },
  });
};

const reset = () => {
  countersStore.dispatch({
    type: "reset",
  });
};

const increase = (counterIndex) => {
  let inputValue = parseInt(
    document.querySelector(`.counter-${counterIndex}-input`).value
  );

  if (inputValue) {
    countersStore.dispatch({
      type: "increase",
      payload: {
        counterIndex,
        inputValue,
      },
    });
  }
};

const decrease = (counterIndex) => {
  let inputValue = parseInt(
    document.querySelector(`.counter-${counterIndex}-input`).value
  );

  if (inputValue) {
    countersStore.dispatch({
      type: "decrease",
      payload: {
        counterIndex,
        inputValue,
      },
    });
  }
};
