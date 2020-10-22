import {
  Card, CardActionArea, CardMedia, Container, Grid, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';
import { GameService } from '../../services';
import { Recommendation } from '../../models';
import { RootState } from '../../store/types';
import { IGDBImageSize, IGDBUtils } from '../common';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const [games, setGames] = useState<Recommendation[]>([]);
  const classes = useStyles();

  const searchTerms = useSelector((state: RootState) => state.searchTerms);

  useEffect(() => {
    GameService.getRecommendations(searchTerms).then((res) => setGames(res.data));
  }, [searchTerms]);

  return (
    <>
      <main className="main">
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Your Favorites
            </Typography>
          </Container>
        </div>
        <div style={{ marginTop: 20, padding: 30 }}>
          <Grid container direction="row" spacing={5} justify="center">
            {games.map((game) => (
              <Grid item xs={3} key={game.name}>
                <Link to={`/game/${game.slug}`}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={IGDBUtils.getIGDBImageSource(
                          IGDBImageSize.CoverBig, game.cover.image_id,
                        )}
                      />
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    </>
  );
}
