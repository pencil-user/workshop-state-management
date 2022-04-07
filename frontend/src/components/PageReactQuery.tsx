import { PageUpdateEmployee } from "./ReactQuery/PageUpdateEmployee"
import { PageListEmployees } from "./ReactQuery/PageListEmployees"
import { ShowSettings } from "./ReactQuery/ShowSettings"
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"

export function PageReactQuery() {

  return (
    <div className="App">
      <div className="App-content">
        <div className="title">
          React Query Example
        </div>
        <h3>Simple Example</h3>
        <ShowSettings />
        <h3>Employee Example</h3>
        <ReactQuerySwitch />
      </div>
    </div >)

}

function ReactQuerySwitch() {
  return (
    <Switch>
      <Route path='/query/employee/update/:id'>
        <PageUpdateEmployee />
      </Route>

      <Route path='/query/employees/:page'>
        <PageListEmployees />
      </Route>

      <Route path='/query/'>
        <PageListEmployees />
      </Route>

      <Route path='/'>
        <PageListEmployees />
      </Route>

    </Switch>)
}