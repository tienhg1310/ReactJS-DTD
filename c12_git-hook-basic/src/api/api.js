export const getUser = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: 'tien',
          age: 26,
          address: 'Hanoi'
        },
        status: 200
      })
    }, 1500)
  })
