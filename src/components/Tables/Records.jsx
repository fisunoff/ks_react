import React from 'react';
import { DataGrid, GridToolbarQuickFilter, GridActionsCellItem, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

const url = "http://fisunoff.pythonanywhere.com/api/record/";




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

    DeleteRecord = async (id) => {
        const {token} = this.props;
        try{
            const result = await fetch(url + id + '/', {
                method: "DELETE",
                headers:{
                    'Authorization': 'Token ' + token
                }
            });
            this.componentDidMount();
        }catch (err){
            this.setState({
                error: "Ошибка получения данных"
            }
            )
        }
    }

    columns =  [
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
        headerName: 'Статус'
    },
    {
        field: 'actions',
        type: 'actions',
        getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon />} onClick={this.DeleteRecord.bind(this, params.id)} label="Delete" />
        ]
    }

]

    componentDidMount = async () => {
        const {token} = this.props;
        let todos = []
        try{
            const result = await fetch(url, {
                method: "GET",
                headers:{
                    'Authorization': 'Token ' + token
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
            <DataGrid rows={todos} columns={this.columns} pageSize={5} rowsPerPageOptions={[5]}
            components={{ Toolbar: QuickSearchToolbar }}/>
        </div>
    }
}

export default Records;