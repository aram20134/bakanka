import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { Alert, Box, Button, Chip, Container, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addImage, changeImage, delImage } from '../api/ordersAPI';
import Router from "next/router";

const DrawImage = ({img}) => {
  if (img.image.split('.').pop() === 'mp4') {
    return (
      <Button data-poster={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.poster}&poster=true&q=80&w=390&h=600`} data-video={`{"source": [{"src":"${`${process.env.NEXT_PUBLIC_STATIC_URL}/gallery/${img.image}`}", "type": "video/mp4"}], "attributes": {"preload": false, "controls": true, "playsinline": true}}`}>
        <img alt='' width={'100%'} height={'100%'} src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.poster}&poster=true&q=80&w=390&h=600`} />
      </Button>  
    )
  }
  return (
    <Button data-sub-html={`<h3>${img.title ? img.title : ''}</h3><p>${img.description ? img.description : ''}</p>`} sx={{position:'relative'}} href={`${process.env.NEXT_PUBLIC_STATIC_URL}/gallery/${img.image}`}>
      <img alt='Баканское озеро' width={'100%'} height={'100%'} src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.image}&q=80&w=390&h=600`} />
    </Button>
  )
}

const DrawImageAdmin = ({img, setImages}) => {
  const [change, setChange] = useState(false)
  const [title, setTitle] = useState(img.title)
  const [description, setDescription] = useState(img.description)

  const deleteImage = (id) => {
    delImage(id).then(res => console.log(res))
    setImages(prev => prev.filter((image) => image._id !== id))
  }

  const saveImage = () => {
    setChange(false)
    console.log(title)
    console.log(description)
    changeImage({id: img._id, title, description}).then((res) => console.log(res))
  }

  if (img.image.split('.').pop() === 'mp4') {
    return ( 
      <Box m={1}>
        <Box position={'relative'} target='_blank' href={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.poster}&poster=true&q=80&w=390&h=600`}>
          <Box p={2} position={'absolute'} display={'flex'} width={'100%'} height={'100%'} justifyContent={'center'}>
            <Stack justifyContent={'space-between'}>
              {change ? (
                <>
                  <Box borderRadius={1} bgcolor='aliceblue' p={1}>
                    <TextField value={title} onChange={(e) => setTitle(e.target.value)} size='small' fullWidth label='Заголовок' variant='outlined' />
                  </Box>
                  <Box borderRadius={1} bgcolor='aliceblue' p={1}>
                    <TextField value={description} onChange={(e) => setDescription(e.target.value)} size='small' fullWidth label='Описание' variant='outlined' />
                  </Box>
                </>
              ) : (
                <>
                  <Chip sx={{height: 'auto', minHeight:'32px', '& .MuiChip-label': {display: 'block', whiteSpace: 'normal'}}} label={title ? title : 'Без заголовка'} color='primary' />
                  <Chip sx={{height: 'auto', minHeight:'32px', '& .MuiChip-label': {display: 'block', whiteSpace: 'normal'}}} label={description ? description : 'Без описания'} color='info' />
                </>
              )}
            </Stack>
          </Box>
          <img alt='Баканское озеро' width={'100%'} height={'100%'} src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.poster}&poster=true&q=80&w=390&h=600`} />
        </Box>
        <Box justifyContent={'space-between'} display={'flex'} mx={{xs:0, sm: 2}}>
          <Button size='small' onClick={!change ? () => setChange(true) : () => saveImage()} variant='outlined' color={!change ? 'info' : 'success'}>{change ? 'Сохранить' : 'Изменить'}</Button>
          <Button size='small' onClick={!change ? () => deleteImage(img._id) : () => setChange(false)} variant='outlined' color='error'>{change ? 'Отменить' : 'Удалить'}</Button>
        </Box>
      </Box>
      // <Box>
      //   <Button target='_blank'  href={`${process.env.NEXT_PUBLIC_STATIC_URL}/gallery/${img.image}`} data-poster={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.poster}&poster=true&q=80&w=390&h=600`} data-video={`{"source": [{"src":"${`${process.env.NEXT_PUBLIC_STATIC_URL}/gallery/${img.image}`}", "type": "video/mp4"}], "attributes": {"preload": false, "controls": true, "playsinline": true}}`}>
      //     <img alt='Баканское озеро' width={'100%'} height={'100%'} src={`http://192.168.1.248:5999/api/gallery/getImage?image=${img.poster}&poster=true&q=80&w=390&h=600`} />
      //   </Button> 
      //   <Box justifyContent={'space-between'} display={'flex'} mx={{xs:0, sm: 2}}>
      //     <Button size='small' variant='outlined' color='info'>Изменить</Button>
      //     <Button size='small' onClick={() => deleteImage(img._id)} variant='outlined' color='error'>Удалить</Button>
      //   </Box> 
      // </Box>
    )
  }

  return (
    <Box m={1}>
      <Box position={'relative'} target='_blank' href={`${process.env.NEXT_PUBLIC_STATIC_URL}/gallery/${img.image}`}>
        <Box p={2} position={'absolute'} display={'flex'} width={'100%'} height={'100%'} justifyContent={'center'}>
          <Stack justifyContent={'space-between'}>
            {change ? (
              <>
                <Box borderRadius={1} bgcolor='aliceblue' p={1}>
                  <TextField value={title} onChange={(e) => setTitle(e.target.value)} size='small' fullWidth label='Заголовок' variant='outlined' />
                </Box>
                <Box borderRadius={1} bgcolor='aliceblue' p={1}>
                  <TextField value={description} onChange={(e) => setDescription(e.target.value)} size='small' fullWidth label='Описание' variant='outlined' />
                </Box>
              </>
            ) : (
              <>
                <Chip sx={{height: 'auto', minHeight:'32px', '& .MuiChip-label': {display: 'block', whiteSpace: 'normal'}}} label={title ? title : 'Без заголовка'} color='primary' />
                <Chip sx={{height: 'auto', minHeight:'32px', '& .MuiChip-label': {display: 'block', whiteSpace: 'normal'}}} label={description ? description : 'Без описания'} color='info' />
              </>
            )}
          </Stack>
        </Box>
        <img alt='Баканское озеро' width={'100%'} height={'100%'} src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/getImage?image=${img.image}&q=80&w=390&h=600`} />
      </Box>
      <Box justifyContent={'space-between'} display={'flex'} mx={{xs:0, sm: 2}}>
        <Button size='small' onClick={!change ? () => setChange(true) : () => saveImage()} variant='outlined' color={!change ? 'info' : 'success'}>{change ? 'Сохранить' : 'Изменить'}</Button>
        <Button size='small' onClick={!change ? () => deleteImage(img._id) : () => setChange(false)} variant='outlined' color='error'>{change ? 'Отменить' : 'Удалить'}</Button>
      </Box>
    </Box>
  )
}

const DynamicFileInput = dynamic(() => import('mui-file-input').then(mod => mod.MuiFileInput), {})

const GalleryImages = ({images, adminMode, setImages}) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    setMsg(null)
  }, [files])
  
  const upload = () => {
    const form = new FormData()
    files.forEach(file => {
      form.append('images', file)
    });
    setLoading(true)
    setFiles([])
    addImage(form).then(res => {
      const test = res.filter((el) => el?.FileRequestId ? true : false)
      if (test.length > 0) {
        setMsg('Успешно загружено! Отправленные видео могут обрабатываются до 3 минут. Скоро они появятся в галерее')
      } else {
        setMsg('Все фотографии успешно загружены!')
      }
    }).finally(() => setLoading(false))
  }

  return !adminMode ? (
    <LightGallery plugins={[lgZoom, lgVideo, lgThumbnail]} mode='lg-fade'>
      {images.map((img) => <DrawImage key={img._id} img={img}  />)}
    </LightGallery>
  ) : (
    <>
      {loading ? (
        <Box sx={{my:2}}>
          <LinearProgress sx={{my:2}} />
          <Alert severity='info'>Загружаем файлы. Не закрывайте окно.</Alert>
        </Box>
      ) : (
        <>
          <DynamicFileInput sx={{my:2, width:'100%'}} placeholder='Выберите файлы' multiple value={files} onChange={(files) => setFiles(files)} />
          {msg && <Alert severity='success'>{msg}</Alert>}
          {files.length > 0 && 
            <Box width={'100%'} display={'flex'} gap={2} sx={{mb:2}}>
              <Button onClick={upload} variant='contained' color='success' fullWidth>Загрузить</Button>
              <Button onClick={() => setFiles([])} variant='contained' color='error' fullWidth>Отменить</Button>
            </Box>
          }
        </>
      )}
      <Grid className='lg-react-element' plugins={[lgZoom, lgVideo, lgThumbnail]} mode='lg-fade'>
        {images.map((img) => <DrawImageAdmin setImages={setImages} key={img._id} img={img}  />)}
      </Grid>
    </>
  )
}

export default GalleryImages