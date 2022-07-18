import React from 'react';
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const url = "http://fisunoff.pythonanywhere.com/api/record/";
const default_token = "26041d0e2e5563b580ba8bb9a59bcf00724609fd"

const columns = [
    {
        field: 'title',
        headerName: 'Название',
        width: 200
    },
    {
        field: 'author',
        headerName: 'Автор'
    },
    {
        field: 'tag',
        headerName: 'Тэг'
    },
    {
        field: 'status',
        headerName: 'status'
    },

]

function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </Box>
    );
  }

class Records extends React.Component{
    state = {
        todos: [],
        error: ""
    }

    componentDidMount = async () => {
        let todos = []
        try{
            const result = await fetch(url, {
                method: "GET",
                headers:{
                    'Authorization': 'Token ' + default_token
                }
            })
            todos = await result.json();
        }catch (err){
            this.setState({
                error: "Ошибка получения данных"
            })
        }
        
        this.setState({
            todos,
        })
    }
    

    render(){
        const {error, todos} = this.state;

        return <div className='records'>
            Records
            <h2>{error}</h2>
            <DataGrid rows={todos} columns={columns} pageSize={5} rowsPerPageOptions={[5]}
            components={{ Toolbar: QuickSearchToolbar }}/>
        </div>
    }
}

export default Records;