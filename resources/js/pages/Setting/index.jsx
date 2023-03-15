import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { Button, FormControl, Input, MenuItem, Select, FormControlLabel, Radio, InputLabel }  from '@mui/material';
import { startAction, endAction, showToast } from '../../actions/common'
import DataTable from "../../components/DataTable";
import agent from '../../api'
import { logout } from "../../actions/auth";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import { useLaravelReactI18n } from 'laravel-react-i18n'

const Setting = () => {
  const { t, tChoice } = useLaravelReactI18n();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settings, setSettings] = useState([]);
  // const [settings, setSettings] = useState({
  //   header_title: '',
  //   header_sentence: '',
  //   main_color: '',
  //   main_color: '',
  //   bot_text_color: '',
  //   background_color: ''
  // });

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      maxWidth: 100,
      editable: false
    }, 
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      editable: false
    }, 
    {
      field: 'actions',
      headerName: '操作',
      minWidth: 100,
      renderCell: ( params ) => {
        if(params.row.role != 1){
          return  <div>
            <RemoveRedEyeIcon onClick={()=>goEditPage(params.row.id)} style={{cursor: 'pointer', fontSize: '1.25rem'}} />
          </div>
        } 
        else 
          return <div key={params.row.id}></div>;
      },
    },
  ]

  useEffect(() => {
    getSettings();
  }, [])

  const getSettings = async () => {
    // dispatch(startAction())
    // try {
    //   const res = await agent.common.getSettings();
    //   if (res.data.success) {
    //     setScenarios(res.data.data);
    //   }
    //   dispatch(endAction());
    // } catch (error) {
    //   if (error.response.status >= 400 && error.response.status <= 500) {
    //     dispatch(endAction());
    //     dispatch(showToast('error', t(error.response.data.message)));
    //     if (error.response.data.message == 'Unauthorized') {
    //       localStorage.removeItem('token');
    //       dispatch(logout());
    //       navigate('/');
    //     }
    //   }
    // }
  }

  const goEditPage = (id) => {
    navigate(`/question/edit/${id}`);
  }

  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Setting List</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table_container">
                        <DataTable 
                          data={settings}
                          columns={columns}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Setting