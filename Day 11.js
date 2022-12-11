{
	const number_of_rounds = 20 //lvl2 -> 10000
	const divide_by_three = true //lvl2 -> false
  
  const input = document.querySelector('pre').innerText
  const divisors_of_interest = input.match(/(?<=divisible by )\d+$/mg).map(n => ~~n)

	class Item {
    constructor (number) {
      this.rests = {}
      divisors_of_interest.forEach(d => {
        this.rests[d] = number % d
      })
      this.actual = number
    }
    
    update (converter) {
      divisors_of_interest.forEach(d => {
        this.rests[d] = converter(this.rests[d]) % d
      })
      this.actual = converter(this.actual)
    }
    
    modulo (d) {
      return divide_by_three ? this.actual % d : this.rests[d]
    }
  }
  
	class Monkey {
    number_of_items_inspected = 0
    
    constructor (inventory, operation, divisibility_test, yes, no) {
      const operation_factory = (operator, numbers) => (
      	{
          '+': old => numbers[0](old) + numbers[1](old),
          '*': old => numbers[0](old) * numbers[1](old)
        }
        [operator]
      )
      
      
      this.inventory = inventory.match(/\d+/g).map(i => (new Item(~~i)))
      this.operation = operation_factory(
        operation.match(/[+*]/)[0],
        operation.match(/(\d+|old)/g).map(n => o => n === 'old' ? o : ~~n)
      )
      this.divisibility_test = ~~divisibility_test.match(/\d+$/)[0]
      this.yes = ~~yes.match(/\d+$/)[0]
      this.no = ~~no.match(/\d+$/)[0]
    }
    
    catch (item) {
      this.inventory.push(item)
    }
    
    inspect (item) {
      if (divide_by_three) {
        item.update(n => Math.floor(this.operation(n) / 3))
      } else {
        item.update(this.operation)
      }
      
      ++this.number_of_items_inspected
      if (item.modulo(this.divisibility_test) === 0) {
        return this.yes
      } else {
        return this.no
      }
    }
    
    do_round (monkeys) {
      this.inventory.forEach(item => {
        monkeys[this.inspect(item)].catch(item)
      })
      
      this.inventory = []
    }
  }
  
  const monkeys = input.split('Monkey ').filter(m => m !== '').map(m => {
    const lines = m.split('\n')
		return new Monkey(lines[1], lines[2], lines[3], lines[4], lines[5])
  })
  
  for (let i = 0; i < number_of_rounds; ++i) {
    monkeys.forEach(m => m.do_round(monkeys))
  }
  
  {
    const sorted_monkeys = monkeys.sort((a, b) => b.number_of_items_inspected - a.number_of_items_inspected)
    console.table({
      [`Level of monkey business after ${number_of_rounds} rounds`]: sorted_monkeys[0].number_of_items_inspected * sorted_monkeys[1].number_of_items_inspected
    })
  }
}
