import React from 'react';
import { DataGrid, GridToolbarQuickFilter, GridActionsCellItem, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import NewRecord from './NewRecord';
import "../modal.css";

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
        error: "",
        show: false,
    }

    DoUpdateAfterModal = async () => {
        this.componentDidMount();
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

    GoToRecord = async (id) => {
        const {setView} = this.props;
        setView("viewrecord", id);
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
            <>
                <GridActionsCellItem icon={<DeleteIcon />} onClick={this.DeleteRecord.bind(this, params.id)} label="Delete" />
                <GridActionsCellItem icon={<PreviewIcon />} onClick={this.GoToRecord.bind(this, params.id)} label="View" />
            </>
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
            todos: todos,
        })
    }
    

    render(){
        const {error, todos} = this.state;

        return <div className='records'>
            <h1>Записи</h1>
            <button><a href="#openModal">Новая запись</a></button>
            <div id="openModal" class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Название</h3>
                        <a href="#close" title="Close" class="close">×</a>
                    </div>
                    <div class="modal-body">    
                        <NewRecord token = {this.props.token} update={this.DoUpdateAfterModal} className='modal-content'/>
                    </div>
                    </div>
                </div>
            </div>
            <h2>{error}</h2>
            <DataGrid rows={todos} columns={this.columns} pageSize={20} rowsPerPageOptions={[20]}
            components={{ Toolbar: QuickSearchToolbar }}/>
        </div>
    }
}

export default Records;